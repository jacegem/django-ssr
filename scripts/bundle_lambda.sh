#!/bin/bash
mkdir lambda-build && cd lambda-build

# gather all files needed for lambda
echo "Gathering files..."
mkdir bundles
cp ../assets/server/*.js bundles
cp ../assets/js/server/index.js .

# bundle necessary function
zip -r lambda.zip *
mv lambda.zip ..

# clean up
cd ..
rm -rf lambda-build
