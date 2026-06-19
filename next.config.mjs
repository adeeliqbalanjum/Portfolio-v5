const isPages=process.env.GITHUB_PAGES==='true';export default{output:'export',trailingSlash:true,basePath:isPages?'/Portfolio-v5':'',images:{unoptimized:true}};
