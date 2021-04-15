/**
 * Crossword puzzle game JS plugin.
 *
 * @version 1.0.0
 */

/* global jQuery */
(function (win, $) {
    'use strict';

    /**
     * Initial Configuration.
     */
    var Crossword = {
        'loaderClass': 'loader',
        'mainClass': 'crossword',
        'clueClass': 'crossword-clues',
        'config': {},
        'map': []
    };

    var $puzzleParent = $('.' + Crossword.mainClass);

    /**
     * Initializes rendering of crossword puzzle based on given configuration.
     *
     * @param {object} config Crossword configuration file.
     *
     * @return void
     */
    Crossword.init = function (config) {
        this.config = config;
        drawArrayMap();
        renderPuzzle();

        // Reset the height of puzzle on resize.
        // TODO: This can be a throttling call.
        $(win).on('resize', this.resizePuzzle);

        addBehaviouralEvents();

        // Hide crossword loader.
        $('.' + this.loaderClass).css({
            'display': 'none'
        });
    };

    /**
     * Add behavioural evenets for better user experience.
     * TODO: To add more keyword/intuitive user experience.
     *
     * @private
     *
     * @return void
     */
    var addBehaviouralEvents = function () {
        $puzzleParent.on('focus', 'input', highlightPuzzleInput);
        $puzzleParent.on('blur', 'input', resetPuzzleInput);
    };

    /**
     * Reset input puzzle feild.
     *
     * @private
     *
     * @return void
     */
    var resetPuzzleInput = function () {
        $puzzleParent.find('input').removeClass('select');
    };

    /**
     * Highlight input puzzle feild.
     *
     * @private
     *
     * @return void
     */
    var highlightPuzzleInput = function (e) {
        var focusedPuzzleCount = Math.max.apply(null, $(e.target).closest('.puzzle-cell').data('puzzle'));

        resetPuzzleInput();
        $puzzleParent
            .find('.puzzle-' + focusedPuzzleCount + ' input')
            .addClass('select');
    };

    /**
     * Create empty dimensional array as per the configuration.
     *
     * @private
     *
     * @return void
     */
    var createMultiDimentionalArray = function () {
        var i, j;

        for (i = 0; i < Crossword.config.sizeX; i++) {
            Crossword.map[i] = [];
            for (j = 0; j < Crossword.config.sizeY; j++) {
                Crossword.map[i][j] = [];
            }
        }
    };

    /**
     * Set the crossword array map based on the given indexes.
     *
     * @private
     *
     * @return void
     */
    var drawArrayMap = function () {
        var i,
            j,
            across = Crossword.config['across'],
            down = Crossword.config['down'];

        createMultiDimentionalArray();
        // Across
        for (i = 0; i < across.length; i++) {
            for (j = 0; j < across[i].length; j++) {
                Crossword.map[(across[i].y - 1)][(across[i].x + j - 1)]
                    .push(across[i].number);
            }
            renderClues("across", across[i].number, across[i].desc, across[i].length);
        }
        // Down
        for (i = 0; i < down.length; i++) {
            for (j = 0; j < down[i].length; j++) {
                Crossword.map[(down[i].y + j - 1)][(down[i].x - 1)]
                    .push(down[i].number);
            }
            renderClues("down", down[i].number, down[i].desc, down[i].length);

        }
    };

    /**
     * Render the crossword puzzle DOM based on array map.
     *
     * @private
     *
     * @return void
     */
    var renderPuzzle = function () {
        var i,
            j,
            puzzleCellClass = '',
            puzzleNumberClass,
            puzzleNumber,
            puzzleCount = 0;

        $('<div>').appendTo($puzzleParent).addClass('crossword-puzzle');
        for (i = 0; i < Crossword.map.length; i++) {
            $('<div>').appendTo($puzzleParent.find('.crossword-puzzle'))
                .addClass('puzzle-row puzzle-row-' + (i + 1));
            for (j = 0; j < Crossword.map[i].length; j++) {
                puzzleCellClass = 'puzzle-input';
                puzzleNumberClass = [];
                puzzleNumber = [];
                Crossword.map[i][j].forEach(function (element) {
                    puzzleNumberClass.push('puzzle-' + element);
                    puzzleNumber.push(element);
                });
                if (Crossword.map[i][j].length === 0) {
                    puzzleCellClass = 'puzzle-none';
                }

                // Append puzzle cell.
                $('<div>').appendTo($puzzleParent.find('.puzzle-row-' + (i + 1)))
                    .addClass('puzzle-cell')
                    .addClass(puzzleNumberClass.join(' '))
                    .addClass('puzzle-cell-' + (j + 1) + (i + 1))
                    .addClass(puzzleCellClass)
                    .data('puzzle', puzzleNumber)
                    .css({
                        'width': (100 / Crossword.config.sizeX) + '%'
                    });

                // Append puzzle number in cell.
                // Instead of Math function, we could also use Array.reduce.
                if ((Crossword.map[i][j].length > 0) &&
                    (puzzleCount < Math.max.apply(null, Crossword.map[i][j]))) {
                    $puzzleParent.find('.puzzle-cell-' + (j + 1) + (i + 1)).append('<span>' + (puzzleCount + 1) + '</span>');
                    puzzleCount = Math.max.apply(null, Crossword.map[i][j]);
                }
            }
        }
        Crossword.resizePuzzle();
        renderPuzzleInput();
    };

    /**
     * Render the crossword puzzle user input.
     *
     * @private
     *
     * @return void
     */
    var renderPuzzleInput = function () {
        var $puzzleCellInput = $('<input maxlength="1" val="" type="text" />');

        $puzzleParent.find('.puzzle-input').append($puzzleCellInput);
    };

    /**
     * Resize the crossword puzzle dimensions for responsive views.
     *
     * @return void
     */
    Crossword.resizePuzzle = function () {
        $puzzleParent.find('.puzzle-cell')
            .css({
                'height': $puzzleParent.find('.puzzle-cell').width(),
                'fontSize': ($puzzleParent.find('.puzzle-cell').width() / 3)
            })
    };

    /**
     * Render the crossword clues.
     *
     * @param {string} direction   Direction of the word, cross or down.
     * @param {number} serialNum   Serial number of the crossword clues.
     * @param {string} description Crossword clue description.
     * @param {number} length      Length of the word.
     *
     * @private
     *
     * @return void
     */
    var renderClues = function (direction, serialNum, description, length) {
        var $clueParent = $('.' + Crossword.clueClass);

        if ($clueParent.find('h2.crossword-label-' + direction).length === 0) {
            $('<h2>').appendTo($clueParent)
                .text(direction)
                .addClass('crossword-label-' + direction);
            $('<ul>').appendTo($clueParent).addClass('crossword-clues-' + direction);
        }
        $('<li>').appendTo($clueParent.find('ul.crossword-clues-' + direction))
            .html(serialNum + '. ' + description + ' (' + length + ')')
            .addClass('crossword-clue');
    };

    win.Crossword = Crossword;
})(window, jQuery);
