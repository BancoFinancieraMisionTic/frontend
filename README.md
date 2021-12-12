# Frontend in VueJS for administrative users of Sarlaft software  
Project using VueJS and Apollo GraphQL  

# To use this code:  

## Recommended steps Part 1 - Prepare (using Ubuntu Terminal):  

mkdir \<directory>  
cd \<directory>  
git init  
git remote add origin https://github.com/BancoFinancieraMisionTic/frontend.git  
git fetch  
git checkout -b fork/\<your name>  
git pull origin main  
cd \<project>  
git branch -a (verify it is your branch)  
git status  
node --version  

## Recommended steps Part 2 - Deploy (using Ubuntu Terminal):  
cd \<directory>    
npm install 
npm run serve -- --port 8081    
### If errors during npm install, run:  
npm install graphql graphql-tag apollo-link-context vuex @vue/apollo-composable @apollo/client @vue/apollo-option --legacy-peer-deps


## Recommended steps Part 3 - Change (using Visual Studio for changes and Ubuntu Terminal for Git instr.):  
Change the code  
git pull origin fork/\<your name>  
git add \<each file, avoid using .>  
git commit -m "A useful message"  
git pull origin fork/\<your name>  (yes, again)  
git push origin fork/\<your name>  

## Recommended steps Part 4 - Test (using Chrome or Firefox)):  
Visit http://localhost:8081  

## Credits:  
Developed by:  
Team 7 - P5 MisionTIC2022  
Teacher: @casierrav  