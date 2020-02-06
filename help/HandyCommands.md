## Copy local web folder to S3, excluding hidden .git folders
````
aws s3 cp ~/environment/NationalsWebEntry/web s3://national-scout-rifle-championships-entry/ --recursive --exclude ".git/*"`
````
## Browse site directly from S3
````
http://national-scout-rifle-championships-entry.s3-website-eu-west-1.amazonaws.com
````