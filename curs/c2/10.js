function fibGen(){
  let cache = [1,1]
  function fib(index){
      if (index < cache.length){
          console.warn('found ' + index)
          return cache[index]
      }
      else{						
          cache[index] = fib(index - 1) + fib(index - 2)
          return cache[index]
      }
  }
  return fib
}
let f = fibGen()
console.log(f(1))
console.log(f(5))
console.log(f(3))
