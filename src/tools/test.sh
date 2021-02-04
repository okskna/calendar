cd ./src/_posts
for i in "$(ls *.*)"; do 
  echo "$i"  > ../tools/fileList.txt;
done
cd ../..
react-scripts start

