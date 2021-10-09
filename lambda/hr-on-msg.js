exports.handler =  async function(event, context) {
    const connectionId = event.requestContext.connectionId;
      return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify("hello connection!!! "+connectionId)
      }
}