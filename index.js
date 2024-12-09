let m0, mC, tA, cX0, S, uE;
let p = 1.23;
let g = 9.81;

let button = document.querySelector("button");
button.addEventListener("click",()=>{
    m0 = +document.querySelector(".m0").value;
    mC = +document.querySelector(".mC").value;
    tA = +document.querySelector(".tA").value;
    cX0 = +document.querySelector(".cX0").value;
    S = +document.querySelector(".S").value;
    uE = +document.querySelector(".uE").value;



let resObj = {
	1: {
		z: { V: 50, θ: 0.78, y: 2, x: 0},
		results: {}
	},
	2: {
		z: {},
		results: {}
	},
	3: {
		z: {},
		results: {}
	},
	4: {
		z: {},
		results: {}
	},
	5: {
		z: {},
		results: {}
	},
};

for (let i = 1; i < 6; i++) {
    let t = i - 1;
	if (i <= tA) {
		resObj[i].results["V"] = ( ((mC * uE) / (m0 - mC * t)) - ( cX0 * ((p * (resObj[i].z.V ** 2)) / 2) * (S / (m0 - mC * t)) ) - (g * Math.sin(resObj[i].z.θ)) ).toFixed(2); // V

        resObj[i].results["θ"] = ( -g * Math.cos(resObj[i].z.θ)  / resObj[i].z.V ).toFixed(2); // θ

        resObj[i].results["x"] = (resObj[i].z.V * Math.cos(resObj[i].z.θ)).toFixed(2); // x

        resObj[i].results["y"] = (resObj[i].z.V * Math.sin(resObj[i].z.θ)).toFixed(2); // y

        if (i < 5) {
        resObj[i+1].z["V"] = (+resObj[i].z.V + +resObj[i].results["V"]).toFixed(2);
        resObj[i+1].z["θ"] = (+resObj[i].z.θ + +resObj[i].results["θ"]).toFixed(2);
        resObj[i+1].z["x"] = (+resObj[i].z.x + +resObj[i].results["x"]).toFixed(2);
        resObj[i+1].z["y"] = (+resObj[i].z.y + +resObj[i].results["y"]).toFixed(2);
        }
	} else {
        resObj[i].results["V"] = ( 0 / (m0 - mC * tA) - (cX0 * ((p * resObj[i].z.V ** 2) / 2) * (S / (m0 - mC * tA))) - g * Math.sin(resObj[i].z.θ) ).toFixed(2); // V

        resObj[i].results["θ"] = ( -g * Math.cos(resObj[i].z.θ) / resObj[i].z.V ).toFixed(2); // θ

        resObj[i].results["x"] = (resObj[i].z.V * Math.cos(resObj[i].z.θ)).toFixed(2); // x

        resObj[i].results["y"] = (resObj[i].z.V * Math.sin(resObj[i].z.θ)).toFixed(2); // y

        
        if (i < 5) {
            resObj[i+1].z["V"] = (+resObj[i].z.V + +resObj[i].results["V"]).toFixed(2);
            resObj[i+1].z["θ"] = (+resObj[i].z.θ + +resObj[i].results["θ"]).toFixed(2);
            resObj[i+1].z["x"] = (+resObj[i].z.x + +resObj[i].results["x"]).toFixed(2);
            resObj[i+1].z["y"] = (+resObj[i].z.y + +resObj[i].results["y"]).toFixed(2);
        }
	}
}

let container = document.querySelector(".container");
let table = document.createElement("table");


let tableO = {
    N:{
        row:document.createElement("tr"),
        n:document.createElement("td"),
        t:document.createElement("td"),
        z:document.createElement("td"),
        r:document.createElement("td")
    }
}
tableO.N.n.innerText = "Шаг";
tableO.N.t.innerText = "t";
tableO.N.z.innerText = "z";
tableO.N.r.innerText = "Δ";


for (let i = 1; i<6; i++) {
    tableO[i] = {};
    tableO[i].row = document.createElement("tr");

    let zV = document.createElement("div");
    zV.innerText = "V = " + resObj[i].z.V;
    let zθ = document.createElement("div");
    zθ.innerText = "θ = " + resObj[i].z.θ;
    let zy = document.createElement("div");
    zy.innerText = "y = " + resObj[i].z.y;
    let zx = document.createElement("div");
    zx.innerText = "x = " + resObj[i].z.x;

    let rV = document.createElement("div");
    rV.innerText = "ΔV = " + resObj[i].results.V;
    let rθ = document.createElement("div");
    rθ.innerText = "Δθ = " + resObj[i].results.θ;
    let ry = document.createElement("div");
    ry.innerText = "Δy = " + resObj[i].results.y;
    let rx = document.createElement("div");
    rx.innerText = "Δx = " + resObj[i].results.x;


    tableO[i].n = document.createElement("td");
    tableO[i].n.innerText = i;

    tableO[i].t = document.createElement("td");
    tableO[i].t.innerText = i-1;

    tableO[i].z = document.createElement("td");
    tableO[i].z.appendChild(zV);
    tableO[i].z.appendChild(zθ);
    tableO[i].z.appendChild(zy);
    tableO[i].z.appendChild(zx);

    tableO[i].r = document.createElement("td");
    tableO[i].r.appendChild(rV);
    tableO[i].r.appendChild(rθ);
    tableO[i].r.appendChild(ry);
    tableO[i].r.appendChild(rx);
}
console.log(tableO);

let trArr = ["N",1,2,3,4,5];
let tdArr = ["n","t","z","r"];
for (let i = 0; i < trArr.length; i++) {
    for (let j = 0; j < tdArr.length; j++) {
        tableO[trArr[i]].row.appendChild( tableO[trArr[i]][tdArr[j]] );
    }
    table.appendChild(tableO[trArr[i]].row)
}
container.appendChild(table);

});