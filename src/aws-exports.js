// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "eu-west-1",
    "aws_cognito_identity_pool_id": "eu-west-1:2054bd7e-b7e9-4f6b-b81f-e5784e3f201b",
    "aws_cognito_region": "eu-west-1",
    "aws_user_pools_id": "eu-west-1_mJfBYGoZ3",
    "aws_user_pools_web_client_id": "78q3rb12ejgvpruodp0el9m2ik",
    "oauth": {
        "domain": "hsrc-prod.auth.eu-west-1.amazoncognito.com",
        "scope": [
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:8080/,https://master.d2d1geoaz2t1ye.amplifyapp.com/,https://hsrc-prod.auth.eu-west-1.amazoncognito.com/,https://hsrc-dev.auth.eu-west-1.amazoncognito.com/,https://hsrc-test.auth.eu-west-1.amazoncognito.com/",
        "redirectSignOut": "http://localhost:8080/,https://hsrc-prod.auth.eu-west-1.amazoncognito.com/,https://master.d2d1geoaz2t1ye.amplifyapp.com/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_AND_IDENTITY_POOLS",
    "aws_appsync_graphqlEndpoint": "https://66fcv54nzrdufovoi3aaiwjdyy.appsync-api.eu-west-1.amazonaws.com/graphql",
    "aws_appsync_region": "eu-west-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_cloud_logic_custom": [
        {
            "name": "AdminQueries",
            "endpoint": "https://f2mewlppag.execute-api.eu-west-1.amazonaws.com/prod",
            "region": "eu-west-1"
        }
    ],
    "aws_mobile_analytics_app_id": "f489dae7eafa484daf7d93bc3421c7f1",
    "aws_mobile_analytics_app_region": "eu-west-1",
    "aws_user_files_s3_bucket": "hsrc-nsrc-uploaded-imagesprod-prod",
    "aws_user_files_s3_bucket_region": "eu-west-1"
};


export default awsmobile;
