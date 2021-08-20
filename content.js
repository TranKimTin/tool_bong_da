let daClick = {};
let list = [];
let index = 0;

window.onload = function () {
    function setClick() {
        $('div table tbody tr td ul li div').unbind('click');
        $('div table tbody tr td ul li div').click(function (e) {
            let li = e.target.parentElement;
            let id = e.target.id;
            let rel = $(li).attr('rel');
            let name = li.parentElement.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[1].innerText;
            if (daClick[rel]) return;

            let id1 = $(`li[rel=${rel}]`).children()[0].id;
            let id2 = $(`li[rel=${rel}]`).children()[1].id;
            let val1 = $(`#${id1}`).text();
            let val2 = $(`#${id2}`).text();

            let input = prompt(`${name} \n${val1} ${val2}`, `0.5___0.9___1___10__________0.5___1___1.4___10`);
            if (input != null) {
                daClick[rel] = 1;
                console.log(getTinme(), id, rel);
                let list3So = input.split('__________').map(item => [...item.split('___').map(item => item * 1), false]);
                for (let baSo of list3So) {
                    let temp = baSo[3];
                    baSo[3] = baSo[4];
                    baSo[4] = temp;
                }
                list.push({ name, id, rel, list3So });
            }
        });
    }

    function copyToClipboard() {
        console.log(getTinme(), 'copy');
        try {
            var text = "chrome://discards/";
            navigator.clipboard.writeText(text).then(function () {
                console.log(getTinme(), 'Async: Copying to clipboard was successful!');
                window.open('', '_blank');
                window.focus();
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
        }
        catch (err) {
            console.error(getTinme(), "clipboard error", err);
        }
    }

    function main() {
        console.log(getTinme(), list);
        //hien cac tran trong list ra
        try {
            setClick();
        }
        catch (err) {
            console.error(getTinme(), "set click error", err);
        }

        try {
            let logo = document.getElementById('btnTT');
            // let sportList = document.getElementById('sportList');
            // sportList.overflow = 'scroll';
            logo.style.height = '100vh';
            logo.style['z-index'] = 999;
            logo.style.zoom = 0.8;
            logo.style.width = '100%';


            logo.innerHTML = `
                <table style='border: 1px solid black;'>
                    ${list.map(tran => {
                let { name, id, rel, list3So } = tran;
                return list3So.map(baSo => {
                    return `
                                <tr class="tr-xoa" so0=${baSo[0]} so1=${baSo[1]} so2=${baSo[2]} id="${id}" rel="${rel}"'>
                                    <td style='border: 1px solid black;'>
                                        ${name}
                                    </td>
                                    <td style='border: 1px solid black;'>
                                        ${baSo[0]}
                                    </td>
                                    <td style='border: 1px solid black;'>
                                        ${baSo[1]}
                                    </td>
                                    <td style='border: 1px solid black;'>
                                        ${baSo[2]}
                                    </td>
                                    <td style='border: 1px solid black;'>
                                        ${baSo[3]}
                                    </td>
                                    <td style='border: 1px solid black;'>
                                        ${baSo[4]}
                                    </td>
                                </tr>
                            `;
                }).join('\n')
            }).join('\n')}
                </table>
                <button id="copylink" style="zoom:1.3" >Bấm vào đây</button>
            `;
            $('#copylink').unbind('click');
            $('#copylink').click(() => { copyToClipboard(); });
            $('.tr-xoa').unbind('click');
            $('.tr-xoa').click(function (e) {
                let tr = e.target.parentElement;
                let so0 = tr.getAttribute('so0');
                let so1 = tr.getAttribute('so1');
                let so2 = tr.getAttribute('so2');
                let id1 = tr.getAttribute('id');
                let rel1 = tr.getAttribute('rel');

                if (confirm(`Xóa ${so0} ${so1} ${so2} ?`)) {
                    daClick[rel1] = false;
                    for (let tran of list) {
                        let { id, rel, list3So } = tran;
                        if (id == id1 && rel == rel1) {
                            tran.list3So = list3So.filter(baSo => !(baSo[0] == so0 && baSo[1] == so1 && baSo[2] == so2));
                        }
                    }
                    list = list.filter(item => item.list3So.length > 0);
                }
            });
        }
        catch (err) {
            console.error(getTinme(), "ERROR TABLE", err);
        }

        try {
            for (let tran of list) {
                let { name, id, rel, list3So } = tran;
                $(`li[rel=${rel}]`).css('background', '#CCFF00');
                try {
                    let id1 = $(`li[rel=${rel}]`)[0].childNodes[0].getAttribute('id');
                    let id2 = $(`li[rel=${rel}]`)[0].childNodes[1].getAttribute('id');
                    let val1 = $(`div[id='${id1}']`)[0].innerText;
                    let val2 = $(`div[id='${id2}']`)[0].innerText;

                    console.log(getTinme(), '......', name, id, val1, val2, $(`li[rel=${rel}]`)[0].childNodes);

                    if (!val1 || val1.trim() == '') continue;
                    if (!val2 || val2.trim() == '') continue;

                    val1 *= 1;
                    val2 *= 1;


                    for (let baSo of list3So) {
                        if (val1 == baSo[0] && val2 >= baSo[1] && val2 < baSo[2] && baSo[3] == false) {
                            console.log(getTinme(), 'Dat tien ', val1, val2, id, rel, ...baSo);

                            //dat tien
                            $(`div[id='${id}']`).trigger('click');
                            $(`div[rel=${rel}] .BIL_In  input`).val(baSo[4]);


                            //so sanh so do
                            let r = $('input[placeholder="Tiền thắng"]').attr('rel');
                            let idspan = `sc1Odds${r}`;
                            let valspan = $(`span[id=${idspan}]`).text();
                            valspan *= 1;
                            console.log(getTinme(), 'span', valspan);
                            if (val1 == baSo[0] && valspan >= baSo[1] && valspan < baSo[2] && baSo[3] == false) {
                                console.log(getTinme(), 'dat thanh cong');
                                baSo[3] = true;
                                $(`input[onclick="CartS1.Check()"]`).trigger('click');
                                // window.CartS1.Check();

                                $(`input[onclick="CartS2.Confirm()"]`).trigger('click');
                                // CartS2.Confirm();
                            } else {
                                console.log(getTinme(), 'dat that bai');
                            }

                        }
                    }
                }
                catch (err) {
                    console.error(getTinme(), 'ERROR', err);
                }
            }
        }
        catch (err) {
            console.error(getTinme(), "ERROR", err);
        }
        setTimeout(main, 1000);
    }

    function reloadPage() {
        try {
            console.log(getTinme(), 'reload');
            let top = $('.gameListAll_scroll').scrollTop();
            $('.btn_gameList_all').trigger('click');
            $('.btn_gameList_all').trigger('click');

            setTimeout(() => {
                $('.gameListAll_scroll').scrollTop(top);
            }, 500);
        }
        catch (err) {
            console.error(getTinme(), 'reload error', err);
        }
        setTimeout(reloadPage, 10000);
    }
    reloadPage();

    function getTinme() {
        return new Date().toLocaleString('en-us', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
    }
    main();
}