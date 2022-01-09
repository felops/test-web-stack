module "appsync" {
  source = "terraform-aws-modules/appsync/aws"

  name = var.project

  schema = file("schema.graphql")

  api_keys = {
    default = null # such key will expire in 7 days
  }

  datasources = {
    UserTable = {
      type       = "AMAZON_DYNAMODB"
      table_name = "user"
      region     = var.region
    }
  }

  depends_on = [aws_dynamodb_table.user]

  resolvers = {
    ## CREATE USER
    "Mutation.createUser" = {
      data_source       = "UserTable"
      request_template = <<EOF
{
  "version": "2017-02-28",
  "operation": "PutItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
  },
  "attributeValues": $util.dynamodb.toMapValuesJson($ctx.args.input),
  "condition": {
    "expression": "attribute_not_exists(#id)",
    "expressionNames": {
      "#id": "id",
    },
  },
}
EOF

      response_template = <<EOF
$util.toJson($context.result)
EOF
    }

    ## UPDATE USER
    "Mutation.updateUser" = {
      data_source       = "UserTable"
      request_template = <<EOF
{
  "version": "2017-02-28",
  "operation": "UpdateItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($ctx.args.input.id),
  },

  ## Set up some space to keep track of things we're updating **
  #set( $expNames  = {} )
  #set( $expValues = {} )
  #set( $expSet = {} )
  #set( $expAdd = {} )
  #set( $expRemove = [] )

  ## Iterate through each argument, skipping keys **
  #foreach( $entry in $util.map.copyAndRemoveAllKeys($ctx.args.input, ["id"]).entrySet() )
    #if( $util.isNull($entry.value) )
      ## If the argument is set to "null", then remove that attribute from the item in DynamoDB **

      #set( $discard = $${expRemove.add("#$${entry.key}")} )
      $!{expNames.put("#$${entry.key}", "$${entry.key}")}
    #else
      ## Otherwise set (or update) the attribute on the item in DynamoDB **

      $!{expSet.put("#$${entry.key}", ":$${entry.key}")}
      $!{expNames.put("#$${entry.key}", "$${entry.key}")}
      $!{expValues.put(":$${entry.key}", $util.dynamodb.toDynamoDB($entry.value))}
    #end
  #end

  ## Start building the update expression, starting with attributes we're going to SET **
  #set( $expression = "" )
  #if( !$${expSet.isEmpty()} )
    #set( $expression = "SET" )
    #foreach( $entry in $expSet.entrySet() )
      #set( $expression = "$${expression} $${entry.key} = $${entry.value}" )
      #if ( $foreach.hasNext )
        #set( $expression = "$${expression}," )
      #end
    #end
  #end

  ## Continue building the update expression, adding attributes we're going to ADD **
  #if( !$${expAdd.isEmpty()} )
    #set( $expression = "$${expression} ADD" )
    #foreach( $entry in $expAdd.entrySet() )
      #set( $expression = "$${expression} $${entry.key} $${entry.value}" )
      #if ( $foreach.hasNext )
        #set( $expression = "$${expression}," )
      #end
    #end
  #end

  ## Continue building the update expression, adding attributes we're going to REMOVE **
  #if( !$${expRemove.isEmpty()} )
    #set( $expression = "$${expression} REMOVE" )

    #foreach( $entry in $expRemove )
      #set( $expression = "$${expression} $${entry}" )
      #if ( $foreach.hasNext )
        #set( $expression = "$${expression}," )
      #end
    #end
  #end

  ## Finally, write the update expression into the document, along with any expressionNames and expressionValues **
  "update": {
    "expression": "$${expression}",
    #if( !$${expNames.isEmpty()} )
      "expressionNames": $utils.toJson($expNames),
    #end
    #if( !$${expValues.isEmpty()} )
      "expressionValues": $utils.toJson($expValues),
    #end
  },

  "condition": {
    "expression": "attribute_exists(#id)",
    "expressionNames": {
      "#id": "id",
    },
  }
}
EOF

      response_template = <<EOF
$util.toJson($context.result)
EOF
    }

    ## DELETE USER
    "Mutation.deleteUser" = {
      data_source       = "UserTable"
      request_template = <<EOF
{
  "version": "2017-02-28",
  "operation": "DeleteItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($ctx.args.input.id),
  },
}
EOF

      response_template = <<EOF
$util.toJson($context.result)
EOF
    }

    ## LIST USER
    "Query.listUser" = {
      data_source       = "UserTable"
      request_template = <<EOF
{
  "version": "2017-02-28",
  "operation": "Scan",
  "filter": #if($context.args.filter) $util.transform.toDynamoDBFilterExpression($ctx.args.filter) #else null #end,
  "limit": $util.defaultIfNull($ctx.args.limit, 20),
  "nextToken": $util.toJson($util.defaultIfNullOrEmpty($ctx.args.nextToken, null)),
}
EOF

      response_template = <<EOF
$util.toJson($context.result)
EOF
    }
  }
}