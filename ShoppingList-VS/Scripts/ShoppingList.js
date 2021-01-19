$(document).ready(function () {
    var current = $("#current");
    var previous = $("#previous");

    $.getJSON("Content/List.json", function (data) {


        var id;
        var selected;
        var listSelected
        var currentList = data.CurrentList.Items;
        var previousList = data.PreviousList.Items;

        function renderPreviousList() {
            for (var i = 0; i < previousList.length; i++) {

                previousList.sort((a, b) => {
                    return a.Index - b.Index;
                });

                previous.append("<option class='prevItem' id='" + previousList[i].Id + "' value='" + previousList[i].Id + "'>" + previousList[i].Name + "</option>");
            }
        }

        function renderCurrentList() {
            for (var i = 0; i < currentList.length; i++) {

                currentList.sort((a, b) => {
                    return a.Index - b.Index;
                });

                if (currentList[i].HighPriority === true) {
                    current.append("<option class='curItem redText' id='" + currentList[i].Id + "' value='" + currentList[i].Id + "'>" + currentList[i].Name + "</option>");
                }
                else {
                    current.append("<option class='curItem' id='" + currentList[i].Id + "' value='" + currentList[i].Id + "'>" + currentList[i].Name + "</option>");
                }
            }
        }

        //pre-populated lists will be rendered on page start
        if (previousList != null) {
            renderPreviousList();
        }

        if (currentList != null) {
            renderCurrentList();
        }

        //List items on click find selected item in list array
        $("body").on("click", "#previous option", function (event) {
            id = $(this).val();
            selected = previousList.find(i => i.Id == id); 
            $("#deleteButton").prop("disabled", false);
        });

        $("body").on("click","#current option", function (event) {
            id = $(this).val();
            selected = currentList.find(i => i.Id == id);
            $("#deleteButton").prop("disabled", true);
        });

        //Stores which list is clicked on
        $(previous).on("click", function () {
            listSelected = $(this).attr("id");
        });

        $(current).on("click", function () {
            listSelected = $(this).attr("id");
        });

        //Button logic
        $("#left").on("click", function () {
            if (selected != null) {

                var duplicateFound;

                //Changes the index of the selcted item based on largest index in the current list
                //Also detects any duplicates and stops the user from adding a duplicate item to a list.
                if (currentList.length == 0) {
                    selected.Index = 1;
                } else {
                    for (var i = 0; i < currentList.length; i++) {

                        if (currentList[i].Index < selected.Index) {
                            selected.Index = currentList[i].Index + 1;
                        }
                        else {
                            selected.Index = currentList[i].Index + 1;
                        }
                        if (selected.Name.toLowerCase() === currentList[i].Name.toLowerCase()) {
                            duplicateFound = true;
                        }
                    }
                }

                if (duplicateFound == true) {
                    alert("Can not add a duplicate items to the current list.");
                } else {
                    //Add item to current list and remove lists from HTML
                    currentList.push(selected);
                    previous.children().remove();
                    current.children().remove();

                    //Remove item from previous list and and rerender both
                    var index = previousList.indexOf(selected);
                    previousList.splice(index, 1);

                    renderPreviousList();
                    renderCurrentList();
                }
            }

            else if (selected == null) {
                alert("Please select an item.");
            }
            selected = null;
        });

        $("#right").on("click", function () {
            if (selected != null) {

                var duplicateFound = false;

                //Changes the index of the selcted item based on largest index in the current list
                //Also detects any duplicates and stops the user from adding a duplicate item to a list.
                if (previousList.length == 0) {
                    selected.Index = 1;
                }
                else {
                    for (var i = 0; i < previousList.length; i++) {

                        if (previousList[i].Index < selected.Index) {
                            selected.Index = previousList[i].Index + 1;
                        }
                        else {
                            selected.Index = previousList[i].Index + 1;
                        }

                        if (selected.Name.toLowerCase() == previousList[i].Name.toLowerCase()) {
                            duplicateFound = true;
                        }
                    }
                }

                if (duplicateFound == true) {
                    alert("Can not add duplicate items to the previous list.");
                }
                else {
                    //Add item to previous list and remove lists from HTML
                    previousList.push(selected);
                    previous.children().remove();
                    current.children().remove();

                    //Remove item from current list and and rerender both
                    var index = currentList.indexOf(selected);
                    currentList.splice(index, 1);

                    renderPreviousList();
                    renderCurrentList();
                }
            }

            else if (selected = nu) {
                alert("Please select an item")
            }
            selected = null;
        });

        $("#up").on("click", function () {

            if (selected != null) {

                //Ability to re-order previous list works but is not part of the spec, uncomment if you wish to implement.

                //if (listSelected == previous.attr("id") && selected.Index > 1) {
                //    previous.children().remove();

                //    for (var i = 0; i < previousList.length; i++) {

                //        //Changes the selected items index to the above items
                //        if (previousList[i].Id == selected.Id) {
                //            previousList[i].Index = selected.Index - 1;
                //        }

                //        //Changes the item index of the item above the selcted item to the selected items index
                //        else if (previousList[i].Index == selected.Index - 1) {
                //            previousList[i].Index = selected.Index;
                //        }
                //    }

                //    renderPreviousList();

                //    console.log(previousList);

                //}

                if (listSelected == previous.attr("id")) {
                    alert("Can not re-order previous list.");
                }

                if (listSelected == current.attr("id") && selected.Index > 1) {
                    current.children().remove();

                    for (var i = 0; i < currentList.length; i++) {

                        //Changes the selected items index to the above items
                        if (currentList[i].Id == selected.Id) {
                            currentList[i].Index = selected.Index - 1;
                        }
                        else if (currentList[i].Index + 1 == selected.Index) {
                            currentList[i].Index = selected.Index;
                        }
                    }

                    renderCurrentList();
                }
                else if (selected.Index <= 1 && listSelected == current.attr("id")) {
                    alert("Item is already at the top of the list.");
                }
            }
            else {
                alert("Please select an item sort.");
            }
        });


        $("#down").on("click", function () {
             
            if (selected != null) {

                if (listSelected == previous.attr("id")) {
                    alert("Can not re-order previous list.");
                }

                var largestCurIndex;

                for (var i = 0; i < currentList.length; i++) {
                    if (selected.Index <= currentList[i].Index) {
                        largestCurIndex = currentList[i].Index;
                    }
                }

                if (listSelected == current.attr("id") && selected.Index < largestCurIndex) {
                    current.children().remove();

                    for (var i = 0; i < currentList.length; i++) {

                        //Changes the selected items index to the below items
                        if (currentList[i].Id == selected.Id) {
                            currentList[i].Index = selected.Index + 1;
                        }
                        //Changes the below index to the index of the above
                        else if (currentList[i].Index == selected.Index ) {
                            currentList[i].Index = currentList[i].Index - 1;;
                        }
                    }

                    renderCurrentList();

                }
                else if (selected.Index <= largestCurIndex && listSelected == current.attr("id")) {
                    alert("Item is already at the bottom of the list.");
                }
            }
            else {
                alert("Please select an item sort.");
            }
        });

        //Clears current list
        $("#clear").on("click", function (event) {
            currentList.length = 0;
            current.children().remove();
            renderCurrentList();
        });

        //Saves current list to local storage
        //Viewed https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage for help
        $("#save").on("click", function (event) {
            if (currentList.length == 0) {
                alert("Can not save an empty list.");
            } else {
                localStorage.setItem("savedList", JSON.stringify(currentList));
                console.log(JSON.parse(localStorage.getItem("savedList")));
            }

        });

        //Populates previous list with the saved list
        $("#load").on("click", function (event) {
            previousList = JSON.parse(localStorage.getItem("savedList"));
            previous.children().remove();
            renderPreviousList();
        });

        $("#deleteButton").on("click", function (event) {

            if (selected != null && $("option").parent(previous)) {
                $("#DeleteModal").modal("toggle");

                $("#confirmDelete").on("click", function (event) {
                    //Remove item from list and HTML
                    var index = previousList.indexOf(selected);
                    previousList.splice(index, 1);
                    previous.children("#" + selected.Id + "").remove();
                    $("#DeleteModal").modal("toggle");
                });
            }
            else {
                alert("Please select an item to delete.");
            }
        });

        $("#editButton").on("click", function (event) {
            if (selected != null) {
                $("#ItemModal").modal("toggle");
                $("#item-name").val(selected.Name);
                $("#highPriority").prop("checked", selected.HighPriority);

               //On form submit edit item
                $("#ItemForm").unbind().submit(function (event) {
                    event.preventDefault();

                    selected.Name = $("#item-name").val();
                    selected.HighPriority = $("#highPriority").prop("checked");

                    for (var i = 0; i < previousList.length; i++) {
                        if (previousList[i].Name == selected.Name) {
                            previousList[i] = selected;
                            previous.children("#" + selected.Id + "").text(selected.Name);
                        }
                    }

                    for (var i = 0; i < currentList.length; i++) {
                        if (currentList[i].Name == selected.Name) {
                            currentList[i] = selected;
                            current.children("#" + selected.Id + "").text(selected.Name);
                        }
                    }

                    $("#ItemModal").modal("toggle");
                });
            }
            else {
                alert("Please select an item to edit.")
            }
        });

        $("#addButton").on("click", function (event) {
            $("#AddItemModal").modal("toggle");

            //On form submit add new item
            $("#AddItemForm").unbind().submit(function (event) {
                event.preventDefault();
                current.children().remove();

                var NewName = $("#Additem-name").val(); 
                var NewHighPriority = $("#AddhighPriority").prop("checked");
                var NewIndex = 0;
                var NewId = 0;
                var largestPrevId;
                var largestCurId
                var duplicateFound;

                //Check is the new item has a new
                if (NewName.trim().length > 0) {

                    //Validates that the new item name does not already exist
                    for (var i = 0; i < currentList.length; i++) {
                        if (NewName.toLowerCase() === currentList[i].Name.toLowerCase()) {
                            duplicateFound = true;
                        }

                    }

                    if (duplicateFound == true) {
                        alert("Can not add an item which already exists in the current list.");
                    }
                    else {

                        //If the current list is empty and the previous list is not then the new items Id will equal one more than the largest Id in the previous list
                        if (currentList.length == 0 && previousList.length > 0) {
                            for (var i = 0; i < previousList.length; i++) {
                                largestPrevId = previousList[i].Id;
                                NewId = previousList[i].Id + 1;
                                NewIndex = 1;


                            }
                        }

                        //When the current list is longer than the previous list the new Id's will auto increment for there
                        if (currentList.length > previousList.length) {
                            for (var i = 0; i < currentList.length; i++) {
                                largestCurId = currentList[i].Id;


                                if (NewId < largestPrevId) {
                                    NewId = largestPrevId + 1
                                }
                                else if (NewId < largestCurId) {
                                    NewId = largestCurId + 1
                                }
                                else if (NewId < currentList[i].Id) {
                                    NewId = currentList[i].Id + 1;
                                } 

                                if (currentList[i].Index < NewId) {
                                    NewIndex = currentList[i].Index + 1;
                                }

                            }
                        }

                        if (previousList.length == 0) {

                            for (var i = 0; i < currentList.length; i++) {

                                if (NewId > currentList[i].Id) {
                                    NewId = largestCurId + 1;
                                } else {
                                    largestCurId = currentList[i].Id;
                                }

                            }
                        }

                        //If the current list is not empty then the previous list is checked.
                        //If the largest current item Id is larger than any in the previous list the new items Id will auto increment from the current list Id's instead
                        else if (currentList.length > 0) {

                            for (var i = 0; i < previousList.length; i++) {
                                largestPrevId = previousList[i].Id;
                            }

                            for (var i = 0; i < currentList.length; i++) {
                                largestCurId = currentList[i].Id;

                                if (largestCurId > largestPrevId) {
                                    if (currentList[i].Id < currentList) {
                                        NewId = currentList + 1;
                                    }
                                    else {
                                        NewId = currentList[i].Id + 1;
                                    }
                                }
                                else {
                                    if (currentList[i].Id < largestPrevId) {
                                        NewId = largestPrevId + 1;
                                    }
                                    else {
                                        NewId = currentList[i].Id + 1;
                                    }
                                }

                                //Auto increments the index
                                if (currentList[i].Index < NewId) {
                                    NewIndex = currentList[i].Index + 1;
                                }
                            }
                        }

                        //If both lists are empty the starting Id will be 1
                        else if (currentList.length == 0 && previousList.length == 0) {
                            NewId = 1;
                            NewIndex = 1;
                        }

                        var newItem = {};
                        newItem["Id"] = NewId;
                        newItem["Name"] = NewName;
                        newItem["Index"] = NewIndex;
                        newItem["HighPriority"] = NewHighPriority;

                        currentList.push(newItem);
                    }
                }
                else {
                    alert("Please enter item details.");
                }

                console.log(currentList);
                console.log(previousList);

                $("#Additem-name").val(null);
                $("#AddhighPriority").prop("checked", false);
                $("#AddItemModal").modal("toggle");
                renderCurrentList();

            });
        });


    });
});