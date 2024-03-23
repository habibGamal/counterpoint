export let commands = [
    {
        id: "share",
        toolbar: { type: "image", toolbar_id: 1, hintText: "مشاركة" },
        event: "onclick",
        keys: ["Ctrl+R"],
        command: () => {
            showShareModal();
        },
        name: "Share music",
    },

    {
        id: "undo",
        toolbar: { type: "image", disabled: true, toolbar_id: 1, hintText: "Undo" },
        event: "onclick",
        keys: ["Ctrl+Z"],
        command: () => {
            undoState();
        },
        name: "Undo",
    },
    {
        id: "redo",
        toolbar: { type: "image", disabled: true, toolbar_id: 1 },
        event: "onclick",
        keys: ["Ctrl+Y"],
        command: () => {
            redoState();
        },
        name: "Redo",
    },
    { separator: true, toolbar: { toolbar_id: 1 } },
    {
        id: "whole",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["1", "Numpad1"],
        command: () => {
            set_len(16);
        },
        name: "Input whole note",
    },
    {
        id: "half",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["2", "Numpad2"],
        command: () => {
            set_len(8);
        },
        name: "Input half note",
    },
    {
        id: "quarter",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["4", "Numpad4"],
        command: () => {
            set_len(4);
        },
        name: "Input quarter note",
    },
    {
        id: "8th",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["8", "Numpad8"],
        command: () => {
            set_len(2);
        },
        name: "Input 1/8 note",
    },
    {
        id: "16th",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["6", "Numpad6"],
        command: () => {
            set_len(1);
        },
        name: "Input 1/16 note",
    },
    { separator: true, toolbar: { toolbar_id: "2" } },
    {
        id: "dot",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["Period", "NumpadDecimalPoint"],
        command: () => {
            toggle_dot();
        },
        name: "Input dotted note",
    },
    {
        id: "tie",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["T", "Backslash", "NumpadDivide"],
        command: () => {
            toggle_tie();
        },
        name: "Input tie between notes",
    },
    {
        id: "note_c",

        toolbar: { type: "text", text: "C", fullText: "C", fontSize: 1.6, toolbar_id: 3 },
        event: "onclick",
        keys: ["C"],
        command: () => {
            set_note(0);
        },
        name: "Input note C",
    },
    {
        id: "note_d",

        toolbar: { type: "text", text: "D", fullText: "D", fontSize: 1.6, toolbar_id: 3 },
        event: "onclick",
        keys: ["D"],
        command: () => {
            set_note(1);
        },
        name: "Input note D",
    },
    {
        id: "note_e",

        toolbar: { type: "text", text: "E", fullText: "E", fontSize: 1.6, toolbar_id: 3 },
        event: "onclick",
        keys: ["E"],
        command: () => {
            set_note(2);
        },
        name: "Input note E",
    },
    {
        id: "note_f",

        toolbar: { type: "text", text: "F", fullText: "F", fontSize: 1.6, toolbar_id: 3 },
        event: "onclick",
        keys: ["F"],
        command: () => {
            set_note(3);
        },
        name: "Input note F",
    },
    {
        id: "note_g",

        toolbar: { type: "text", text: "G", fullText: "G", fontSize: 1.6, toolbar_id: 3 },
        event: "onclick",
        keys: ["G"],
        command: () => {
            set_note(4);
        },
        name: "Input note G",
    },
    {
        id: "note_a",

        toolbar: { type: "text", text: "A", fullText: "A", fontSize: 1.6, toolbar_id: 3 },
        event: "onclick",
        keys: ["A"],
        command: () => {
            set_note(5);
        },
        name: "Input note A",
    },
    {
        id: "note_b",

        toolbar: { type: "text", text: "B", fullText: "B", fontSize: 1.6, toolbar_id: 3 },
        event: "onclick",
        keys: ["B"],
        command: () => {
            set_note(6);
        },
        name: "Input note B",
    },
    { separator: true, toolbar: { toolbar_id: 2 } },
    {
        id: "dblflat",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: [],
        command: () => {
            toggle_alter(-2);
        },
        name: "Input double flat",
    },
    {
        id: "flat",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["Dash", "NumpadSubtract"],
        command: () => {
            toggle_alter(-1);
        },
        name: "Input flat",
    },
    {
        id: "natural",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["N", "EqualSign"],
        command: () => {
            toggle_alter(0);
        },
        name: "Input natural",
    },
    {
        id: "sharp",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["Shift+EqualSign", "NumpadAdd"],
        command: () => {
            toggle_alter(1);
        },
        name: "Input sharp",
    },
    {
        id: "dblsharp",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: [],
        command: () => {
            toggle_alter(2);
        },
        name: "Input double sharp",
    },

    { separator: true, toolbar: { toolbar_id: 2 } },
    {
        id: "rest",
        toolbar: { type: "image", toolbar_id: 2 },
        event: "onclick",
        keys: ["0", "Numpad0"],
        command: () => {
            set_rest(true);
        },
        name: "Input rest",
    },

    {
        id: "add_bar",
        toolbar: { type: "image", toolbar_id: 1 },
        event: "onclick",
        keys: ["Ctrl+B"],
        command: () => {
            insert_bar();
        },
        name: "Add bar before cursor",
    },
    {
        id: "del_bar",
        toolbar: { type: "image", toolbar_id: 1 },
        event: "onclick",
        keys: ["Ctrl+Delete"],
        command: () => {
            del_bar();
        },
        name: "Delete current bar",
    },

    {
        id: "add_text",
        toolbar: { type: "text", text: "4", fullText: "Text", fontSize: 1.3, toolbar_id: 4 },
        event: "onclick",
        keys: ["Alt+T"],
        command: () => {
            add_text();
        },
        name: "Add text above note",
    },

    {
        id: "play",
        toolbar: { type: "image", toolbar_id: 4 },
        event: "onclick",
        keys: ["Space"],
        command: () => {
            togglePlay(true);
        },
        name: "Playback",
    },
    {
        keys: ["Shift+Space"],
        command: () => {
            togglePlay(false);
        },
        name: "Playback from start",
    },
    {
        id: "up_part",
        keys: ["Ctrl+UpArrow"],
        command: () => {
            voiceChange(-1);
        },
        name: "Move to higher voice",
    },
    {
        id: "down_part",
        keys: ["Ctrl+DownArrow"],
        command: () => {
            voiceChange(1);
        },
        name: "Move to lower voice",
    },
    {
        keys: ["Delete"],
        command: () => {
            if (selected.note && selected.note.n12) {
                delete_selection();
            } else {
                set_rest(false);
            }
        },
        name: "Delete note",
    },
    {
        id: "timesig",
        keys: ["T"],
        command: () => {
            showTimesigModal();
        },
        name: "Change time signature",
    },
    {
        keys: ["LeftArrow"],
        command: () => {
            prev_note();
        },
        name: "Select previous note",
    },
    {
        keys: ["RightArrow"],
        command: () => {
            next_note();
        },
        name: "Select next note",
    },
    {
        keys: ["UpArrow"],
        command: () => {
            if (selected.note && selected.note.n12) {
                increment_selection(1);
            } else {
                increment_note(1);
            }
        },
        name: "Move note up",
    },
    {
        keys: ["DownArrow"],
        command: () => {
            if (selected.note && selected.note.n12) {
                increment_selection(-1);
            } else {
                increment_note(-1);
            }
        },
        name: "Move note down",
    },
    {
        id: "select_left",
        keys: ["Shift+LeftArrow"],
        command: () => {
            grow_selection_horizontal(false);
        },
        name: "Extend selection left",
    },
    {
        id: "select_right",
        keys: ["Shift+RightArrow"],
        command: () => {
            grow_selection_horizontal(true);
        },
        name: "Extend selection right",
    },
    {
        id: "select_up",
        keys: ["Shift+UpArrow"],
        command: () => {
            grow_selection_vertical(false);
        },
        name: "Extend selection up",
    },
    {
        id: "select_down",
        keys: ["Shift+DownArrow"],
        command: () => {
            grow_selection_vertical(true);
        },
        name: "Extend selection down",
    },

    {
        id: "copy",
        toolbar: { type: "image", toolbar_id: 3, hintText: "Copy" },
        event: "onclick",
        keys: ["Alt+C"],
        command: () => {
            copy_selection();
        },
        name: "Copy selection",
    },
    {
        id: "paste",
        toolbar: { type: "image", toolbar_id: 3, hintText: "Paste" },
        event: "onclick",
        keys: ["Alt+V"],
        command: () => {
            paste_selection();
        },
        name: "Paste selection",
    },

    {
        id: "zoom-in",
        event: "onclick",
        keys: ["Ctrl+NumpadAdd"],
        command: () => {
            notation_zoom(1.1);
        },
        name: "Zoom in",
    },
    {
        id: "zoom-out",
        event: "onclick",
        keys: ["Ctrl+NumpadSubtract"],
        command: () => {
            notation_zoom(0.9);
        },
        name: "Zoom out",
    },
    {
        keys: ["Esc"],
        command: () => {
            stop_advancing();
            async_redraw();
            alertify.dismissAll();
        },
        name: "Stop advancing edit",
    },
];
