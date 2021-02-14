<!DOCTYPE html>

<html class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./animals.css">
</head>

<body id="body" class="grass fadein">
    <div id="splashscreen" class="">
        <div class="eagle"></div>
        <div id="infobutton">
            <h2>i</h2>
        </div>
        <div id="infoscreen">
            <p><b>Survive as long as possible.</b><br><br> If you collide with another non-predator animal a new animal will be created with proporties based on a mix from both parents. You will inherit size, speed and special power. You can do this once every day<br><br> All original animals have a special power. Whatever tophalf of body you inherit also comes with that animals special power. Bot animals will die of age after 15 days. Killing a predator will make you bigger <br><br><br> <b>CONTROLLS <br>MOVE:</b> ARROWKEYS<br><br><b>SPECIAL POWER:</b> SPACEKEY</p>
        </div>
        <h1>True Evolution</h1>
        <p id="pressarrowtext">press [ANY ARROWKEY] to enter new world</p>
    </div>
    <div class="deathGrid" id="deathGid">
        <div id="deathScreen" class="fadein">
            <p id="thiskilledyou"></p>
            <div class="deathImage">
                <div id="imageTopHalf" class="animal_tophalf"></div>
                <div id="imageBottomHalf" class="animal_bottomhalf"></div>
            </div>
            <div id="continue">Click here to create new world</div>
            <h1>You´re extinct, loser</h1>
            <p id="endscore"></p>
        </div>
        <div class="scoreGrid">
            <div class="scoreBoard">

                <?php
                echo "<h1>SCOREBOARD</h1>";
                echo "<p id=\"slot1\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot2\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot3\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot4\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot5\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot6\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot7\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot8\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot9\">TEST PARAGRAPH</p>";
                echo "<p id=\"slot10\">TEST PARAGRAPH</p>";
                ?>
            </div>
            <div class="nameInput">
                <input type="text" id="nameInputField">
                <button id="submitButton">SUBMIT</button>
            </div>
        </div>
    </div>

    <h1 id="population">DAY: 1</h1>
    <!-- <p id="speed">NULL baby</p> -->
    <div class="animal" id="animalOriginal">
        <div class="originalAnimalTop animal_tophalf squirrel_tophalf"></div>
        <div class="originalAnimalBottom animal_bottomhalf squirrel_bottomhalf"></div>
        <div class="healthbar fivehealth"></div>
        <h1 id="animalName">Squirrel</h1>

    </div>
    <div class="hud">
        <div class="powerups" id="yellow">
            <p>3x speed</p>
        </div>
        <div class="powerups" id="purple">
            <p>2x speed 2x damage</p>
        </div>
        <div class="powerups" id="red">
            <p>4x damage</p>
        </div>
        <div class="powerups" id="black">
            <p>Teleport</p>
        </div>
        <div class="powerups" id="predatorbiggericon">
            <div id="predatorbiggericon2">
                <p>Predator is bigger (stronger)</p>
            </div>

        </div>
        <div class="powerups" id="predatorsmallericon">
            <div id="predatorsmallericon2">
                <p>Predator is smaller (weaker)</p>
            </div>

        </div>
    </div>



    <audio id="music" src="./media/music.mp3" autoplay loop></audio>
    <audio class="elephantsound" src="./media/Elephant Sound Effect - Trumpet.mp3"></audio>
    <audio id="duckSoundFirstHalf" src="./media/duckSoundFirstHalf.mp3"></audio>
    <audio id="duckSoundSecondHalf" src="./media/duckSoundSecondHalf.mp3"></audio>
    <audio id="elephantSoundFirstHalf" src="./media/elephantSoundFirstHalf.mp3"></audio>
    <audio id="elephantSoundSecondHalf" src="./media/elephantSoundSecondHalf.mp3"></audio>
    <audio id="birbSoundFirstHalf" src="./media/birbSoundFirstHalf.mp3"></audio>
    <audio id="birbSoundSecondHalf" src="./media/birbSoundSecondHalf.mp3"></audio>
    <audio id="squidSoundFirstHalf" src="./media/squidSoundFirstHalf.mp3"></audio>
    <audio id="sqiudSoundSecondHalf" src="./media/sqiudSoundSecondHalf.mp3"></audio>
    <audio id="snakeSoundFirstHalf" src="./media/snakeSoundFirstHalf.mp3"></audio>
    <audio id="snakeSoundSecondHalf" src="./media/snakeSoundSecondHalf.mp3"></audio>
    <audio id="catSoundEffektFirstHalf" src="./media/catSoundEffektFirstHalf.mp3"></audio>
    <audio id="catSoundEffektSecondHalf" src="./media/catSoundEffektSecondHalf.mp3"></audio>
    <audio id="squirrelSoundFirstHalf" src="./media/squirrelSoundFirstHalf.mp3"></audio>
    <audio id="squirrelSoundSecondHalf" src="./media/squirrelSoundSecondHalf.mp3"></audio>
    <audio id="pythonFirstHalf" src="./media/pythonFirstHalf.mp3"></audio>
    <audio id="pythonSecondHalf" src="./media/pythonSecondHalf.mp3"></audio>

    <div class="mobileCover">
        <p>Keyboard is required</p>
    </div>

    <script src="./animalsNew3.js" async defer></script>
</body>

</html>