function showNextScreen() {
    const entryBox = document.querySelector('.entry-box');
    const nextScreen = document.getElementById('next-screen');

    entryBox.style.display = 'none'; // Hide entry box
    nextScreen.classList.remove('hidden'); // Show next screen content
}   

function takeRewardNow() {
    const rewardStatus = 1;
    if (rewardStatus) {
        alert("Congratulations! You can claim your reward now.");
    } else {
        alert("Sorry, the reward is not currently valid.");
    }
}

function takeRewardAfterReturn() {
    alert("Claim your reward after the return period gets over.");
}