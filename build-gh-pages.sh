git checkout master;
git branch -D gh-pages;
git branch gh-pages;
git checkout gh-pages;
yarn build;
rm -rf LICENSE node_modules package.json public README.md src yarn.lock build-gh-pages.sh;
mv build/* ./;
rm -rf build;
git push --force -u origin gh-pages;
