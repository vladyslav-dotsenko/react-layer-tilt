git checkout master &&
git branch -D gh-pages &&
git branch gh-pages &&
git checkout gh-pages &&
yarn install &&
yarn build &&
rm -rf node_modules public README.md src yarn.lock build-gh-pages.sh &&
mv build/* ./ &&
rm -rf build &&
git add . &&
git commit -a -m 'release. gh-pages build' &&
git push --force -u origin gh-pages
