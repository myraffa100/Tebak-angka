// Ambil semua elemen HTML
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const resultMessage = document.getElementById('resultMessage');
const previousGuesses = document.getElementById('previousGuesses');
const guessForm = document.getElementById('guessForm');

// Tentukan angka acak 1 - 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
let guessedNumbers = [];

// Fungsi cek tebakannya
function checkGuess() {
    let userGuess = Number(guessInput.value); // Ambil nilai dari user

    guessedNumbers.push(userGuess); // Menyimpan tebakan sebelumnya
    guessCount++;

    if (userGuess === randomNumber) {
        resultMessage.textContent = `Selamat, Anda menebak angka dengan benar dalam ${guessCount} kali percobaan.`;
        resultMessage.style.color = 'green';
        gameOver();
    } else if (guessCount >= 10) {
        resultMessage.textContent = 'Game over! Anda sudah mencoba 10 kali.';
        resultMessage.style.color = 'red';
        gameOver();
    } else {
        if (userGuess < randomNumber) {
            resultMessage.textContent = 'Terlalu rendah! Coba lagi..';
        } else if (userGuess > randomNumber) {
            resultMessage.textContent = 'Terlalu tinggi! Coba lagi..';
        }
        resultMessage.style.color = 'orange';
    }

    // Tampilkan tebakan sebelumnya
    previousGuesses.textContent = `Tebakan sebelumnya: ${guessedNumbers.join(', ')}`;

    // Reset input
    guessInput.value = '';
    guessInput.focus();
}

// Fungsi akhiri game
function gameOver() {
    guessInput.disabled = true;
    submitGuess.disabled = true;

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Mulai lagi';
    restartButton.classList.add('btn', 'btn-primary', 'mt-3');
    document.body.appendChild(restartButton);
    restartButton.addEventListener('click', restartGame);
}

// Fungsi restart game
function restartGame() {
    guessCount = 0;
    guessedNumbers = [];
    guessInput.disabled = false;
    submitGuess.disabled = false;
    resultMessage.textContent = '';
    previousGuesses.textContent = '';
    guessInput.value = '';
    guessInput.focus();

    // Hapus tombol start
    document.querySelector('button').remove();

    // Membuat angka acak baru
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

// // Tambah event listener pada tombol kirim tebakan
// submitGuess.addEventListener('click', checkGuess);

// Tambahkan event listener pada form untuk mencegah submit dan mengecek tebakan
guessForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah refresh halaman
    checkGuess();
});