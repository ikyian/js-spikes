require.config({
    baseUrl: ".",
    paths: {
        "zepto": "bower_components/zepto/zepto",
        "underscore" : "bower_components/underscore/underscore",
        "underscore.deferred" : "bower_components/underscore.deferred/underscore.deferred",
        "backbone": "bower_components/backbone/backbone",
        "backbone.layoutmanager": "bower_components/layoutmanager/backbone.layoutmanager"
    },
    shim : {
        'zepto': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'underscore.deferred': {
            deps: ['underscore']
        },
        'backbone': {
            deps   : [ 'underscore', 'zepto' ],
            exports: 'Backbone'
        },
        'backbone.layoutmanager': {
            deps   : [ 'backbone'],
            exports: 'LayoutManager'
        },
    },
    map : {
        '*': {
            jquery: 'zepto',
            $: 'zepto',
            _: 'underscore'
        }
    },
    waitSeconds: 15
});

require([
    'zepto',
    'underscore',
    'backbone',
    'backbone.layoutmanager',
    'underscore.deferred'
],
function($, _, Backbone, LayoutManager){
    $(function(){
        console.log('document loaded');

        LayoutManager.configure({
            prefix: 'templates/',
            fetchTemplate: function(path){
                var done = this.async();
                $.get(path, function(content){
                    done(_.template(content));
                }, 'text');
             },
             when: function(promises) {
                 // TODO why does _.when(promises) not work ????
                 return _.when.apply(null, promises);
             },

             deferred: function () {
                 return _.Deferred();
             }
        });
        window.onConfigured();
    });
});
