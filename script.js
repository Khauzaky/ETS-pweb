document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#transaksi');
    const erms = document.querySelector('#erms');
    const contrans = document.querySelector('#daftranss')

    let daftrans = JSON.parse(localStorage.getItem('data_transaksi')) || [];

    function forrup(a){
        if (!a) return 'Rp 0';
        return 'Rp ' + a.toLocaleString('id-ID');
    }
    function tamtrans(){
        contrans.replaceChildren();

        if (daftrans.length === 0) {
            const pKosong = document.createElement('p');
            pKosong.className = 'teks-kosong';
            pKosong.textContent = 'Belum ada transaksi tercatat.';
            contrans.appendChild(pKosong);
            return;
        }

        daftrans.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'transaksi-card';

            const divKiri = document.createElement('div');

            const spanKategori = document.createElement('span');
            spanKategori.className = 'transaksi-kategori';
            spanKategori.textContent = item.kategori;

            const divDetail = document.createElement('div');
            divDetail.className = 'transaksi-detail';
            divDetail.textContent = `${item.tanggal} • ${item.catatan}`;

            divKiri.appendChild(spanKategori);
            divKiri.appendChild(divDetail);

            const divKanan = document.createElement('div');
            divKanan.className = 'transaksi-nominal';
            
            const isPemasukan = item.jenis === 'pemasukan';
            divKanan.classList.add(isPemasukan ? 'nominal-pemasukan' : 'nominal-pengeluaran');
            
            const tanda = isPemasukan ? '+' : '-';
            divKanan.textContent = `${tanda} ${formatRupiah(item.nominal)}`;

            card.appendChild(divKiri);
            card.appendChild(divKanan);
            contrans.appendChild(card);
        });
    }

    tamtrans();

    form.addEventListener('submit', function (e){
        e.preventDefault();
        erms.textContent = '';
        const tglv = document.querySelector('#tgl').value;
        const jenisv = document.querySelector('#jenis').value.toLowerCase();
        const kategoriv= document.querySelector('#kategori').value;
        const nominalv= Number(document.querySelector('#nominal').value);
        const catatanv= document.querySelector('#catatan').value;

        if (!tglv || !jenisv || !kategoriv || !nominalv || !catatanv){
            erms.textContent = 'Semua field wajib diisi!';
            return;
        }
        if (nominalv <= 0){
            erms.textContent = 'Nominal Harus lebih besar dari 0!';
            return;
        }

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

        tamtrans();
    });
});