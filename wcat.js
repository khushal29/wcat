let fs=require("fs");
//input
let input=process.argv.slice(2);
console.log("input",input);
let options=[];
let filePaths=[];
//to extract options and filepaths from input
for(let i=0;i<input.length;i++)
{
    //first character js string
    if(input[i]=="-s"||input[i]=="-b"||input[i]=="-n")
    {
        options.push(input[i]);
    }
    else{
        filePaths.push(input[i]);
    }
}
//console.log("options",options);
//console.log("filePath",filePaths);
//check that all file paths exists
for(let i=0;i<filePaths.length;i++)
{
    let isFilePresent=fs.existsSync(filePaths[i]);
    if(isFilePresent==false)
    {
        console.log("filePath",filePaths[i],"does not exist");
        return;
    }
}
//to read content from filepaths
let totalContent="";
for(let i=0;i<filePaths.length;i++)
{
    let contentOfCurrent=fs.readFileSync(filePaths[i],"utf-8");
    //after every file's content->next file content should come in next line
    totalContent+=contentOfCurrent+"\r\n";
}
//console.log(totalContent);
//implements
//to implement-s option->remove empty line breaks
let isSoption=options.includes("-s");
if (isSoption==true)
{
    //split on basis of line breaks
    let contentArr=totalContent.split("\r\n");
    //console.log(contentArr);
    //identify and remove empty line breaks
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++)
    {
        
        if(contentArr[i]!=="")
        {
            tempArr.push(contentArr[i]);
        }
    }
    //outputArr=tempArr;
    //console.log("tempArr",tempArr);
    totalContent=tempArr.join("\r\n");
}
//console.log(totalContent);
//implement -n ->put a no to every line
//    let isN=options.includes("-n");
//    if(isN==true)
{
    //let count=1;
    //let contentArr=totalContent.split("\r\n");
    //for(let i=0;i<contentArr.length;i++)
    {
       // contentArr[i]=count+". "+contentArr[i];
        //count++;
    }
    //totalContent=contentArr.join("\r\n");
}
//console.log(totalContent);
let isN=options.includes("-n");
let isB=options.includes("-b");
let finalOption;
if(isN==true)
{
    if(isB==true)
    {
        //the option that comes first->that would be final
        let idxB=options.indexOf("-b");
        let idxN=options.indexOf("-n");
        finalOption=idxB<idxN?"-b":"-n";
    }
    else{
        finalOption="-n";
    }
}
else if(isB == true){
    finalOption = "-b";
}
if(finalOption=="-n")
{
    let count=1;
    let contentArr=totalContent.split("\r\n");
    for(let i=0;i<contentArr.length;i++)
    {
         contentArr[i]=count+". "+contentArr[i];
         count++;
     }
     totalContent=contentArr.join("\r\n");
}
console.log(totalContent);
if(finalOption=="-b")
{
    let count=1;
    let contentArr=totalContent.split("\r\n");
    //console.log(contentArr);
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
            contentArr[i]=count+"."+contentArr[i];
            count++;
        }
    }
    totalContent=contentArr.join("\r\n");
    //console.log(contentArr);
}
console.log(totalContent);
