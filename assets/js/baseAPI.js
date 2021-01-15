var baseURL = 'http://api-breakingnews-web.itheima.net'

$.ajaxPrefilter(function(options){
    options.url = baseURL + options.url
})