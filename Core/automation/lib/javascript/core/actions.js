'use strict';

(function(context) {
    'use strict';

    var OPENHAB_CONF = Java.type("java.lang.System").getenv("OPENHAB_CONF");
    load(OPENHAB_CONF + '/automation/lib/javascript/core/osgi.js');

    var oh1_actions = find_services("org.openhab.core.scriptengine.action.ActionService", null) || [];
    var oh2_actions = find_services("org.eclipse.smarthome.model.script.engine.action.ActionService", null) || [];

    oh1_actions.concat(oh2_actions).forEach(function (item, index) {
        context[item.actionClass.simpleName] = item.actionClass.static;
    });

    var Exec = Java.type('org.openhab.core.model.script.actions.Exec');
    var HTTP = Java.type('org.openhab.core.model.script.actions.HTTP');
    var Log = Java.type('org.openhab.core.model.script.actions.Log');
    var Ping = Java.type('org.openhab.core.model.script.actions.Ping');
    var ScriptExecution = Java.type('org.openhab.core.model.script.actions.ScriptExecution');

    var static_imports = [Exec, HTTP, Log, Ping]

    static_imports.forEach(function (item, index) {
        context[item.class.simpleName] = item.class.static;
    });

})(this);
