// script tic tac toe

// public 
let cells = document.querySelectorAll('.cell')
cells = Array.from(cells)
let player = "X"

// kombinasi kemenangan dalam game 
let kombinasiMenang = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
// script auto reset if semua cell sudah terisi // seri
function cekSeri() {
    let cellPenuh = cells.every(cell => cell.innerText.trim() !== '');
    if (cellPenuh) {
        let Kemenangan = false; 
        // Mengecek Apakah ada kemungkinan Kemenangan game
        kombinasiMenang.forEach(function(kombinasi) {
          let Penuh = kombinasi.every(index => cells[index].innerText.trim() !== '');
          if (Penuh) {
            let isSamePlayer = kombinasi.every(index => cells[index].innerText === 'X') ||
                               kombinasi.every(index => cells[index].innerText === 'O');
            if (isSamePlayer) {
              Kemenangan = true;
            }
          }
        });
        // Game berakhir seri
        if (!Kemenangan) {
        //   console.log("Seri - Semua sel sudah terisi, tetapi tidak ada kombinasi menang.");
          alertInfo("Game Berakhir Seri", '<img src="seri.gif"width="100px">')
        }
    }
}
// script mengecek tiap ada kemungkinan kemenangan
function cekMenang() {
    kombinasiMenang.forEach(function(kombinasi) {
        let cek = kombinasi.every(index => cells[index].innerText.trim() == player)
        if (cek) {
            // mengecek player mana yang menang
            if (player == "X") {
                document.getElementById('x').value ++
                alertInfo('Game Berakhir Pemenang Player X', '<img src="piala.gif"width="100px">')
                Kemenangan(kombinasi) 
            } else if (player == "O"){
                document.getElementById('o').value ++
                Kemenangan(kombinasi)
                alertInfo("Game Berakhir Pemenang Player O", '<img src="piala.gif"width="100px">')
            }
        }  
    });
}
// script alert Game dan auto Reset
function alertInfo(title, img) {
    Swal.fire({
        title: title,
        text: 'Tekan Untuk Melanjutkan',
        iconHtml: img,
        showLoaderOnConfirm: true,
        preConfirm: function() {
          return new Promise(function(resolve) {
            setTimeout(function() {
              resolve()
            }, 300);
          });
        },
      }).then(function() {
        resetCell()
    })
}
// script memberikan efek pada cell // add class light
function Kemenangan(kombinasi) {
    kombinasi.forEach(function(index){
        cells[index].classList.add("light")
    })
}
// reset cell menghapus class light dan menghapus isi tiap cell
function resetCell() {
    cells.forEach(function(cell) {
        cell.innerHTML = '';
      });
    cells.forEach(function(cell) {
        cell.classList.remove("light")
      });
    Swal.fire('Game Baru');
}
// script player mengisi cell dengan X atau O dan kelangsungan game
cells.forEach(function (cell) {
    cell.addEventListener('click', function(){
    if (cell.innerText.trim() != "") return
        cell.innerText = player
        cekMenang()
        cekSeri()
        player = player == "X" ? "O" : "X"
    })
})
