function dieDist(sides, sign=1){
    const dist = {};
    for(let i=1;i<=sides;i++){
        dist[sign*i] = 1/sides;
    }
    return dist;
}

function convolve(a,b){
    const out = {};
    for(const va in a){
        for(const vb in b){
            const s = Number(va)+Number(vb);
            out[s] = (out[s]||0) + a[va]*b[vb];
        }
    }
    return out;
}

function addDice(dist, count, sides){
    if(count === 0) return dist;

    const sign = Math.sign(count);
    const n = Math.abs(count);

    for(let i=0;i<n;i++){
        dist = convolve(dist, dieDist(sides, sign));
    }

    return dist;
}

function buildBonus(d4,d6,d8,d10,d12){
    let dist = {0:1};

    dist = addDice(dist, d4, 4);
    dist = addDice(dist, d6, 6);
    dist = addDice(dist, d8, 8);
    dist = addDice(dist, d10, 10);
    dist = addDice(dist, d12, 12);

    return dist;
}

function d20Dist(adv){
    const dist = {};

    for(let r=1;r<=20;r++){
        if(adv===0)
            dist[r] = 1/20;
        else if(adv===1)
            dist[r] = (r/20)**2 - ((r-1)/20)**2;
        else
            dist[r] = ((21-r)/20)**2 - ((20-r)/20)**2;
    }

    return dist;
}

export function compute(DC, adv, d4, d6, d8, d10, d12){

    //DIS = 0.25%
    //STR = 5.00%
    const min = {
        0: 0.0025,
        1: 0.05,
        2: 0.0975
    }

    const max = {
        0: 0.9025,
        1: 0.95,
        2: 0.9975
    }
    const rDist = d20Dist(adv);
    const bDist = buildBonus(d4,d6,d8,d10,d12);

    let p = 0;

    for(const r in rDist){
        for(const b in bDist){
            if(Number(r)+Number(b) >= DC){
                p += rDist[r]*bDist[b];
            }
        }
    }

    return Math.max(Math.min(p, max[adv + 1]), min[adv + 1]);
}