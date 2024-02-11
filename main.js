// 유저가 값을 입력
// "+" 버튼 클릭 시, 할일이 추가
// "Delete" 버튼 클릭 시, 할일이 삭제
// "Check" 버튼 클릭 시, 할일이 종료, 텍스트에 밑줄 => 할일이 종료되었는지 체크하는 정보가 필요 = 객체를 만들어 저장
//  1. Check 버튼 클릭 시 true -> false로 변경
//  2. true일 경우 끝난 것으로 간주 - 밑줄
//  3. false이면 안끝난 것으로 간주 - 그대로
// "In-progress", "Done" 탭을 누르면, 언더바가 이동
// "Done" 탭은 끝난 아이템만, "In-progress" 탭은 진행중인 아이템만 표시
// "All" 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
// querySelectorAll ()안의 조건에 해당되는 값을 모두 가져옴
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all'; // render에서도 해당 값을 가져다 써야하기 때문에 전역변수로 선언. 초기값은 all.
let filteredList = [];
let list = [];
let tabUnderLine = document.getElementById("under-line")

// 메뉴 언더라인 이동 설정
tabs.forEach(tab => 
    tab.addEventListener("click", (e) => tabIndicator(e)))

// 메뉴 언더라인 위치 계산 함수: tabIndicator
function tabIndicator(e) {
    // tabUnderLine의 시작점 x좌표
    tabUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    // tabUnderLine의 길이
    tabUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    // tabUnderLine의 시작점 y좌표
    tabUnderLine.style.top = 
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

// tabs[0]은 underline이기 때문에 제외
for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){
        filter(event)
    })
}

addButton.addEventListener("click", addTask)
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // event.preventDefault();
        // addTask(); addTask 이벤트 직접 호출
        document.getElementById("add-button").click(); // addButton의 click이벤트 트리거
    }
})

function addTask() {
    // task 객체 정의
    let task = {
        id: randomIDGenerate(), // task들을 구별하기 위해 유니크한 값 생성
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render();
}

// 화면 그려주는 함수
function render() {
    // 1. 내가 선택한 탭에 따라서
    if (mode === "all") {
        // taskList
        list = taskList;
    } else if (mode === "ongoing" || mode === "done") {
        // filteredList
        list = filteredList;
    }
    // 2. 리스트를 다르게 보여줌
    // ex. all -> taskList, ongoing/done -> filteredList 보여줘야 함
    let resultHTML = "";
    for(let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div class="task-icon">
                    <img class="task-check" src="/images/rotate-left-solid.svg" onclick="toggleComplete('${list[i].id}')" />
                    <img class="task-delete" src="/images/trash-can-regular.svg" onclick="deleteTask('${list[i].id}')" />
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div class="task-item">${list[i].taskContent}</div>
                <div class="task-icon">
                    <img class="task-check" src="/images/check-solid.svg" onclick="toggleComplete('${list[i].id}')" />
                    <img class="task-delete" src="/images/trash-can-regular.svg" onclick="deleteTask('${list[i].id}')" />
                </div>
            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

// 할일 완료/진행중
function toggleComplete(id) {
    console.log("id", id)
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; // true이면 false로, false이면 true로 변경
            break; // Check할 아이템 찾으면 for문 종료
        }
    }
    render() // isComplete 후 다시 화면을 그에 맞게 업데이트 하기 때문
    // console.log(taskList)
}

// 할일 삭제
// "all" 탭일 경우 외에 "ongoing","done"일 경우에도 할일을 삭제하려면 taskList를 list로 변경
// list를 deleteTask()에서도 사용하려면 전역변수로 빼야함
function deleteTask(id) {
    console.log("delete id: ", id)
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list.splice(i, 1);
            break;
        }
    }
    render()
    // console.log(taskList)
}

// (event)는 addEventListener에서 받음
function filter(event) {
    console.log("filter", event.target.id)
    mode = event.target.id
    filteredList = [] // 전역변수로 빼줘야함
    if (mode === "all") {
        // 전체 리스트 출력
        render()
    } else if (mode === "ongoing") {
        // In-progress 리스트 출력 (isComplete == false)
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filteredList.push(taskList[i])
            }
        }
        // console.log("진행중", filteredList)
        render()
    } else if (mode === "done") {
        // Done 리스트 출력 (isComplete == true)
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filteredList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9); // 함수 결과물을 다른 곳에서 쓰기 위함
}
