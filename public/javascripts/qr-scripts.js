window.addEventListener('load', function () {
    let selectedDeviceId;
    const codeReader = new ZXing.BrowserMultiFormatReader()
    console.log('ZXing code reader initialized')
    codeReader.listVideoInputDevices()
        .then((videoInputDevices) => {

            selectedDeviceId = videoInputDevices[0].deviceId

            codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                if (result) {
                    let arr = result.text.split(' ');
                    console.log(result);
                    document.getElementById('message').textContent = result.text
                    let url = `http://localhost:4008/guests?lastname=${arr[0]}&name=${arr[1]}`;

                    getAllData(url)
                        .then((guests) => {
                            codeReader.reset();
                            window.location.href = `http://localhost:3008/greeting?id=${guests[0].id}`;
                            /*window.open(`http://localhost:3008/greeting?id=${guests[0].id}`, '_blank');*/

                        })
                        .catch(error => {
                            console.log(error.message);
                            codeReader.reset();
                            document.getElementById('message').textContent = result + ' не найдено';
                        });
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error(err);
                }
            })
            console.log(`Started continous decode from camera with id ${selectedDeviceId}`);
        })
        .catch((err) => {
            console.error(err)
        })
})