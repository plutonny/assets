/*       ---    plutonny.js    ---       */
/*   ---  last edited: 24.04.2022  ---   */

var plutonny = {

    version: '1.0.0',
    build: '1'

}

plutonny.sleep = function(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

plutonny.console = {

    warn: function(func, comment) {
        var result = 'plutonny.js: WARN'
          if    (func == undefined) { result += ` in undefined function` }
        else                        { result += ` in ${func}` }
          if (comment == undefined) { result += ` with no comments` }
        else                        { result += `: "${comment}"` }
        console.warn(result)
    },

    error: async function(func, comment) { 
        var result = 'plutonny.js: ERROR'
          if    (func == undefined) { result += ` in undefined function` }
        else                        { result += ` in ${func}` }
          if (comment == undefined) { result += ` with no comments` }
        else                        { result += `: "${comment}"` }
        console.error(result)
        if (document.getElementById('PLmodalER') == null) {
            document.body.innerHTML += '<div id="PLmodalER" class="PLmodalER"><div>'
        }
        document.getElementById('PLmodalER').innerHTML += `
            <div class="mini-PLmodalER">
                <style>
                    .PLmodalER { position: absolute; top: 0; width: 100vw; z-index: 99; }
                    .mini-PLmodalER { display: flex; align-items: center; z-index: 100; margin: 8px; padding: 6px 12px; background-color: var(--root-button-color); box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 24px; }
                </style>
                <p style="margin: 0; word-break: break-all;">${result}</p>
            </div>`
        await plutonny.sleep(2000)
        document.getElementById('PLmodalER').innerHTML = ''
    }

}

plutonny.output = function(id, data) {
    try {
        document.getElementById(id).innerHTML = data
        return true
    } catch {
        plutonny.console.error('plutonny.output', `can't find tag with id ${id}`)
        return false
    }
}

plutonny.get = {

    URLAttributes: function(url) {
        var result = new Object()
        try {
            var parameters = url.split('?')[1].split('&')
            for (var i = 0; i < parameters.length; i++) {
                var par = parameters[i].split('=')
                result[par[0]] = par[1] 
            }
            return result
        } catch {
            plutonny.console.warn(`plutonny.get.URLAttributes`, `given URL doen't have any parameter`)
            return false
        }
    }

}