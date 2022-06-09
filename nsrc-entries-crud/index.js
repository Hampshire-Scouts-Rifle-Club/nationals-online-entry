const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    try {
        const requestJSON = JSON.parse(event.body);
        switch (event.routeKey) {
            case "DELETE /entry/{id}":
                await dynamo
                    .delete({
                        TableName: "nsrc-entries",
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                body = `Deleted item ${event.pathParameters.id}`;
                break;
            case "GET /entry/{id}":
                body = await dynamo
                    .get({
                        TableName: "nsrc-entries",
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                break;
            case "GET /allEntries/{year}/{status}":
                body = `Getting all entries for ${event.pathParameters.year} with status=${event.pathParameters.status}`;
                break;
            case "GET /allEntries":
                body = await dynamo.scan({
                    TableName: "nsrc-entries"
                }).promise();
                break;
            case "PUT /entry":
                await dynamo
                    .put({
                        TableName: "nsrc-entries",
                        Item: {
                            id: requestJSON.id,
                            owner: requestJSON.owner,
                            state: requestJSON.state,
                            updated: new Date().toJSON(),
                            teamEntryJson: JSON.stringify(requestJSON.teamEntry)
                        }
                    })
                    .promise();
                body = `Put entry ${requestJSON.id}`;
                break;
            case "PUT /amendentry":
                await dynamo.get({
                        TableName: "nsrc-entries",
                        Key: {
                            id: event.pathParameters.id
                        }
                    }).promise()
                    .then(getResult => dynamo.put({
                            TableName: "nsrc-entries",
                            Item: {
                                id: `${getResult.Item.id}-superseded`,
                                owner: getResult.Item.owner,
                                state: 'superseded',
                                updated: getResult.Item.updated,
                                teamEntryJson: getResult.Item.teamEntryJson
                            }
                        })
                        .promise())
                    .then(dynamo.put({
                            TableName: "nsrc-entries",
                            Item: {
                                id: requestJSON.id,
                                owner: requestJSON.owner,
                                state: requestJSON.state,
                                updated: new Date().toJSON(),
                                teamEntryJson: JSON.stringify(requestJSON.teamEntry)
                            }
                        })
                        .promise()
                    );
                body = `Amended entry ${requestJSON.id}`;
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};