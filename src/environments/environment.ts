declare var window: any;

export const environment = {
  production: false,
  prefixWS: "ws:",
  apiUrl: 'http://ec2-13-211-114-220.ap-southeast-2.compute.amazonaws.com/api',
  msgSuccess:{
  },
  msgErrors :{
    server : "Error, please try again."
  },
  filesTypes :[
    {id:0, type:'Excel', extensions:[".xlsx",".xlsm",".xlsb",".xltx",".xltm",".xls",".xlt",".xml",".xlam",".xla",".xlw",".xlr"]},
    {id:1,  type:'CSV', extensions:[".csv"]},
    {id:2, type:'GoogleDoc', extensions:[".html"]},
    {id:3, type:'SQL', extensions:[".sql"]},
    {id:4, type:'MongoDB', extensions:[".bson"]},
    {id:5, type:'Open Database Connectivity', extensions:[".odbc"]},
    {id:6, type:'SharePoint', extensions:[]},
    {id:7, type:'Access', extensions:[".mdb",".accdb"]},
    {id:8, type:'Xero', extensions:[]},
    {id:9, type:'GoogleAnalytics', extensions:[".csv",".tsv",".xlsx",".pdf"]},
    {id:10, type:'GoogleAdwords', extensions:[".csv"]},
    {id:11, type:'Dropbox', extensions:[".html",".docx"]},
  ]
};

