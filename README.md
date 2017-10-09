django-ssr
==========

Proof of concept to render a React/Redux app 'server side' in AWS Lambda from within a Django project.

Caveats
-------

Running and deploying requires 4 environment variables set:

 * `AWS_ACCESS_KEY_ID` - credentials for AWS
 * `AWS_SECRET_ACCESS_KEY` - credentials for AWS
 * `REACT_LOCAL` - boolean to tell django whether to request react html from local node server or lambda function
 * `REACT_URL` - either local url/port for node server or api gateway endpoint used to execute lambda function
