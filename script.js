document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#transaksi');

    let daftrans = JSON.parse(localStorage.getItem('data_transaksi')) || [];
    form.addEventListener('submit', function (e){
        e.preventDefault();
        const tglv = document.querySelector('#tgl').value;
        const jenisv = document.querySelector('#jenis').value.toLowerCase();
        const kategoriv= document.querySelector('#kategori').value;
        const nominalv= Number(document.querySelector('#nominal').value);
        const catatanv= document.querySelector('#catatan').value;

        const newtrans = {
            id: Date.now(),
            tanggal: tglv,
            jenis: jenisv,
            kategori: kategoriv,
            nominal: nominalv,
            catatan: catatanv || '-'
        };

        daftrans.unshift(newtrans);
        localStorage.setItem('data_transaksi', JSON.stringify(daftrans));
        form.reset();
    })
})