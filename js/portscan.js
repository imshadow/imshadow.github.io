//  Other RTC Server :
//stun.l.google.com:19302 |stun1.l.google.com:19302 |stun2.l.google.com:19302 |stun3.l.google.com:19302 |stun4.l.google.com:19302 |stun01.sipphone.com |stun.ekiga.net |stun.fwdnet.net |stun.ideasip.com |stun.iptel.org |stun.rixtelecom.se |stun.schlund.de |stunserver.org |stun.softjoys.com |stun.voiparound.com |stun.voipbuster.com |stun.voipstunt.com |stun.voxgratia.org |stun.xten.com
var MaxTime = 300;

function GetAddr(callback) {
    var ip_dups = {};

    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    if (!RTCPeerConnection) {
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    var mediaConstraints = {
        optional: [{ RtpDataChannels: true }]
    };

    var servers = { iceServers: [{ urls: "stun:stun.xten.com" }] };

    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate) {
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        if (ip_regex.exec(candidate) == null) {
            return;
        }
        var ip_addr = ip_regex.exec(candidate)[1];

        if (ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    pc.onicecandidate = function (ice) {
        if (ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    pc.createDataChannel("");

    pc.createOffer(function (result) {
        pc.setLocalDescription(result, function () { }, function () { });

    }, function () { });

    setTimeout(function () {
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function (line) {
            if (line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

GetAddr(function (ip) {
    //var li = document.createElement("li");
    //li.textContent = ip;
    if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
        //document.getElementsByTagName("ul")[0].appendChild(li);
        $("#localIP").text($("#localIP").text() + " " + ip);
    } else if (ip.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)) {
        //document.getElementsByTagName("ul")[2].appendChild(li);
        $("#v6IP").text($("#v6IP").text() + " " + ip);
    } else {
        //document.getElementsByTagName("ul")[1].appendChild(li);
        $("#publicIP").text($("#publicIP").text() + " " + ip);
    }
});

function out(target, port, status) {
    var tmp = $("#result").val()
    var tmpstr = ip + ":" + port + ":" + status
    if(!tmp){
        $("#result").val(tmpstr)
    }else{
        $("#result").val(tmp + "\n" + tmpstr)
    }
}

function scanPort(target, port, timeout) {
    var img = new Image();
    img.onerror = function () {
        if (!img) return;
        img = undefined;
        out(target, port, "open");
    }

    img.onload = img.onerror;
    img.src = 'http://' + target + ':' + port;

    setTimeout(function () {
        if (!img) return;
        img = undefined;
        out(target, port, "close");
    }, timeout);
}

function scan() {
    ip = $("input[name='ip']").val();
    port = $("input[name='port']").val();
    if (ip == "" || !ip.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/)) {
        alert("IP Format Error.");
        return
    }
    plist = []
    if (port.indexOf('-') > 0) {
        tmp = port.split('-');
        for (var i = tmp[0]; i <= tmp[1]; i++) {
            plist.push(i)
        }
    } else if (port.indexOf(',') > 0) {
        plist = port.split(',');
    }
    for (var i in plist) {
        if (plist[i] != "") {
            scanPort(ip, plist[i], MaxTime);
        }
    }
}

function clearPortScan(){
    $("#result").val('');
}