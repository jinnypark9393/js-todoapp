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
let taskList = [];

addButton.addEventListener("click", addTask)

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
    let resultHTML = "";
    for(let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
                <div class="task-done">${taskList[i].taskContent}</div>
                <div class="task-icon">
                    <img class="task-check" src="/images/rotate-left-solid.svg" onclick="toggleComplete('${taskList[i].id}')" />
                    <img class="task-delete" src="/images/trash-can-regular.svg" onclick="deleteTask'${taskList[i].id}')" />
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div class="task-item">${taskList[i].taskContent}</div>
                <div class="task-icon">
                    <img class="task-check" src="/images/check-solid.svg" onclick="toggleComplete('${taskList[i].id}')" />
                    <img class="task-delete" src="/images/trash-can-regular.svg" onclick="deleteTask('${taskList[i].id}')" />
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
function deleteTask(id) {
    console.log("delete id: ", id)
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render()
    // console.log(taskList)
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9); // 함수 결과물을 다른 곳에서 쓰기 위함
}
