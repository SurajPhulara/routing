const edges = [
            [1, 2, 1],
            [1, 3, 4],
            [1, 4, 3],
            [1, 5, 1],
            [1, 6, 6],
            [2, 3, 2],
            [2, 4, 7],
            [2, 5, 8],
            [2, 6, 1],
            [3, 4,10],
            [3, 5, 9],
            [3, 6, 1],
            [4, 5, 1],
            [4, 6, 4],
            [5, 6, 3]
        ]

        const n = edges.length;
        let adjacency_list ={
            1 : [],
            2 : [], 
            3 : [],
            4 : [],
            5 : [],
            6 : []
        };


        function animate() {
            const vertex = document.getElementById(`vertex${answer_path[0]}`);
            vertex.classList.add("visited");
            console.log(" distance = "+total_distance+" lop ",answer_path)
            const n = answer_path.length;
            for(let i=1; i<n; i++)
            {
                // console.log(answer_path[i-1], "  "+"  ", answer_path[i])
                setTimeout(()=>{
                    xyz(answer_path[i-1], answer_path[i])
                }, i*1000);
            }
        }


        for(let i=0; i<n; i++)
        {
            adjacency_list[`${edges[i][0]}`].push([`${edges[i][1]}`, `${edges[i][2]}`])
            adjacency_list[`${edges[i][1]}`].push([`${edges[i][0]}`, `${edges[i][2]}`])
        }
        console.log(adjacency_list)
        
        let answer_path=[];
        
        let total_distance = 1000000;
        async function givepath(source, destination, distance, visited, current_path, itr)
        {
            // console.log("source = "+source)
            await current_path.push(`${source}`);
            visited.set(parseInt(source), true);
            // console.log(visited)
            if(source == destination)
            {
                // console.log("distance = "+ distance + "   total_distance = "+ total_distance)
                if(distance < total_distance) {
                    // console.log("changing")
                    total_distance = distance;
                    answer_path = current_path.slice();

                    // console.log(source + " == " + destination + " reached with distance = "+ total_distance + " : ", answer_path )
                    // console.log("hello : ", answer_path)
                }
                visited.set(parseInt(source), false);
                current_path.pop()
                return;
            }
            // console.log("hhlloo : ", current_path)
            let x = adjacency_list[source].length;
            for await (const num of adjacency_list[source])
            {
                // console.log(num)
                const y=parseInt(num[0]);
                // console.log( y," hhlloo : ", visited.get(y))
                // console.log("back to source = "+source +" calling for y = "+y)
                if(!visited.get(y))
                {
                    await givepath(num[0], destination, distance+parseInt(num[1]), visited, current_path, itr+1);
                    // console.log("back to source calling for y = "+source)
                }
            }
            visited.set(parseInt(source), false);
            current_path.pop()
            return answer_path;
        }

        async function sd(source, destination)
        {
            let path = [source, ];
            if(source == destination)
            {
                console.log(path)
                return path; 
            }
            const visited = new Map();
            for(let i= parseInt(1); i<=6; i++)
            {
                visited.set(i, false);
            }
            let current_path=[];
            current_path = await givepath(source, destination, 0, visited, current_path, 0)
            // then((r)=>{
                // console.log("hj ",r)
            // })
            // setTimeout(()=>{
                // console.log("hello : ", current_path)
                    // console.log("answerk : ", answer_path)
                // }, 1000);
                animate();
        }

        // sd(3,4)




        async function abc() {
            document.querySelectorAll("canvas").forEach((e) => {
                e.remove();
            })
            for(let i=1; i<6; i++)
            {
                for(let j=i+1; j<=6; j++)
                {
                    var line = document.createElement('canvas');
                    line.className = "line"
                    line.id= `edge${i}${j}`;
                    line.width="1100"; 
                    line.height="700";
                    document.querySelector(".l").appendChild(line)
                }
            }
            abcd();
        }
        abc();
        
        async function abcd() {
            const body = await document.querySelector(`body`).getBoundingClientRect();
            const body2 = await document.querySelector(`.graph`).getBoundingClientRect();
            for(let i=1; i<6; i++)
            {
                const v1 = await document.querySelector(`.vertex${i}`).getBoundingClientRect();
                console.log(v1);
                console.log(body)
                for(let j=i+1; j<=6; j++)
                {
                    const v2 = await document.querySelector(`.vertex${j}`).getBoundingClientRect();
                    var line = document.getElementById(`edge${i}${j}`);
                    var context = line.getContext("2d");
                    context.beginPath(); 
                    context.font = "20px Georgia";
                    let tex = "x"
                    for(let x=0; x<adjacency_list[i].length; x++)
                    {
                        if(adjacency_list[i][x][0] == j)
                        {
                            tex = adjacency_list[i][x][1]
                        }
                    }
                    const x = ((v2.left+v2.right)/2+(v1.left+v1.right)/2)/2 -body.left;
                    const y = ((v1.top+v1.bottom)/2+(v2.top+v2.bottom)/2)/2 -body.top;
                    if(i==1 && j==6)
                    {
                        context.fillText(tex, x  -50, y -50 -3);
                    }
                    else if(i==2 && j==5)
                    {
                        context.fillText(tex, x  +50, y -50 -3);
                    }
                    else if(i==3 && j==4)
                    {
                        context.fillText(tex, x  +50, y -3);
                    }
                    else if((i==1 && j==5)  ||  (i==2 && j==6))
                    {
                        context.fillText(tex, x , y -20);
                    }
                    else
                    {
                        context.fillText(tex, x , y -3);
                    }
                    context.lineWidth = 1.5;
                    context.moveTo((v1.left+v1.right)/2 -body.left,(v1.top+v1.bottom)/2 - body.top );
                    context.lineTo((v2.left+v2.right)/2 -body.left,(v2.top+v2.bottom)/2 - body.top );
                    context.stroke();
                    context.closePath();
                }
            }
        }

        // abcd();


        function xyz(i, j){
            const line = document.getElementById(`edge${i}${j}`) ||  document.getElementById(`edge${j}${i}`);
            var context = line.getContext("2d");
            context.strokeStyle = '#ff0000';
            context.lineWidth = 5;
            context.stroke();
            const vertex = document.getElementById(`vertex${j}`);
            vertex.classList.add("visited");

        }
        function xyzr(i, j){
            // const line = document.getElementById(`edge${i}${j}`) ||  document.getElementById(`edge${j}${i}`);
            // // console.log(i+"  "+j+" : ", line)
            // var context = line.getContext("2d");
            // context.strokeStyle = 'black';
            // context.lineWidth = 2;
            // context.stroke();
            const vertex = document.getElementById(`vertex${j}`);
            vertex.classList.remove("visited");
            // console.log(vertex)

        }
        // xyz()
        let run = false;
        function play(){
            if(run)
            {
                const vertex = document.getElementById(`vertex${answer_path[0]}`);
                vertex.classList.remove("visited");
                // console.log(" distance = "+total_distance+" lop ",answer_path)
                const n = answer_path.length;
                for(let i=1; i<n; i++)
                {
                    xyzr(answer_path[i-1], answer_path[i])
                }
                abc()
            }
            run=true;
            answer_path=[];
            total_distance=100000;
            const i = document.getElementById("source").value;
            const j = document.getElementById("destination").value;
            if(i==j) {
                run = false;
                return
            }
            // console.log("kdjkfs   i  =  "+i+"        j== : "+j)
            sd(i,j)
        }