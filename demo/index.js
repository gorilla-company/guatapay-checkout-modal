function showModal() {

    console.log('showModal()')
    console.log({ModoSDK})
    // console.log(ModoSDK.default.testExpose)

    var modalObject = {
        // QRBase64: 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAACXklEQVR42uyXPW79KhDFD6JwyQ5gI+iyLReRsJTC2yJiI7ADly4Q52mc65ukh+j9pYzc/WQJhvk4B3/x70YkTyDkpJMqFnCG5ASyAqvOuXkPC2EG8o0n8Vxj8yHpBFgLZwxnkTedQvOqW1U7JpLYNHPuqnZXOYsA65vOmSkURRb3I9fjiFTIm5d4WImftTOOXDSTLXywAHA/q34YWSNPhBRyTo6sLOY+wG+RZYv7e0Ng/qi1KBby4ASyLjxjgg/pAeskDcd9tqEkbnET4qHYVVeF5jgmkIXbCqnRnKzqqvJ4luhgErkhNu89QrHSDIbgBLKcCzf4kJksoIp73nM0ifu+kzm3wGJh5eGeTzeWLNu6QjOTCa674nDcuR5L9n3fZGllUiqehs+nG022uGmmkFRR7NeswgSCSMloC/wga5eddb/dULJKa3mvG1SBhXWA+V0STyzvOScfumiN710ylEhv63wVab+2Gfmt68cRuSqgZcvUbq3i6wRjybLJFBFR83CUWQVwBpFmYNI5hUttyC7BDLIuUiGBSSpEsTjcGR1L4hk3eJGCoYjaAHlvmaFk2Xnq5nVOD+u6q+X4SsFIIpIiNg9/3bTKrDKcQNZ4xia7sYXaXbfuOF4zZCzZd+bk4RWLEklxYApZzhWhBTaoWln5Ep2/RSQu3aslA4qEMWYCufxcYBKfZeUMrz/GEvELMX36xu7kms8RP5o8/c+nz+qQ2XtMI6F53VVx3fGbXxhOMpMWn3XVx5dfGErk89BiDLrcFLh7YSi5/BxE3T6sY63lMMQE8hf/4/gvAAD//706oHZ7it2dAAAAAElFTkSuQmCC',
        qrString: '0002010102125017001330-62017749-7512600220000068000000002222956520458125303032540410.05802AR5914PRUEBA QR DIMO6012VILLA GESELL610507165627001130000-000000000708396675605003APS51031.0520105312210112160106540210802139667560161046726626984021281807EuAu4cruerlUilEVOAtnrHoJD8eiSgLEb8gV1dwmOVOvuVyLz3YbVM4H/47xacol6QSj9fCc+VKb+0T8280o3Q/QZqwpayHN4b2wSolPTOOa/F+MmYQ//oFFBktruEWCLz2QsRYH3a60QQF9fcOhYXG068lCH2yUnl/83123xM+sVtCFYs=6304cc42',
        checkoutId: 'c529ce02-3b55-4e1b-b63b-55b5f94169a6',
        deeplink: 'deeplink',
        onSuccess: function() {console.log('onSuccess')},
        onFailure: function() {console.log('onFailure')},
        onCancel: function() {console.log('onCancel')},
        callbackURL: '',
    }

    ModoSDK.modoInitPayment(modalObject);

}
