export function uniqueArray(arr) {
  //   arr = arr.map((e) => JSON.stringify(e));
  //   console.log(arr);
  return [...new DeepSet(arr)];
  return [...new Set(arr)].map((e) => {
    if (typeof e === "string") return JSON.parse(e);
    else if (typeof e === "object") return e;
  });
}

export class DeepSet extends Set {
  add(o: any) {
    for (let i of this) if (this.deepCompare(o, i)) return this;
    super.add.call(this, o);
    return this;
  }

  private deepCompare(o: any, i: any) {
    return JSON.stringify(o) === JSON.stringify(i);
  }
}

// function DeepSet() {
//   //
// }
// DeepSet.prototype = Object.create(Set.prototype);
// DeepSet.prototype.constructor = DeepSet;
// DeepSet.prototype.add = function (o) {
//   for (let i of this) if (deepCompareObjects(o, i)) throw "Already existed";
//   Set.prototype.add.call(this, o);
// };

// export const deepCompareObjects = (a, b) => {
//   if (a === b) return true;

//   if (typeof a != "object" || typeof b != "object" || a == null || b == null) return false;

//   let keysA = Object.keys(a),
//     keysB = Object.keys(b);

//   if (keysA.length != keysB.length) return false;

//   for (let key of keysA) {
//     if (!keysB.includes(key)) return false;

//     if (typeof a[key] === "function" || typeof b[key] === "function") {
//       if (a[key].toString() != b[key].toString()) return false;
//     } else {
//       if (!deepCompareObjects(a[key], b[key])) return false;
//     }
//   }

//   return true;
// };
