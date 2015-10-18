define(['cas/my-library'], function(myLibrary){

  describe("my-library", function(){
    describe("sayHello", function(){
      it("should say Hello", function(){
        var x1 = 1;
        expect(myLibrary.sayHello()).toEqual("Hello");
        var x2 = 2;
      })
    })
  })

})