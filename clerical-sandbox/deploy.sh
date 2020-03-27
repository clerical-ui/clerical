export NODE_ENV=production
npm run build
./node_modules/.bin/s3-deploy './dist/**' --cwd './dist/' --region us-east-1 --bucket sandbox.clerical.dev
