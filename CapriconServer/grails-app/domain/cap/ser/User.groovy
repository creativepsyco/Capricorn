package cap.ser

class User {
    
    static final Integer MAX_SIZE = 10 * 1024 * 1024 //10 mb
    
    static hasMany = [ questions : Question , answers : Answer , qnComments : QnComment , ansComments : AnsComment , badges : Badge ]
    
    String name
    byte[] picture
    Date date = new Date()
    
    //Addition
    

    static constraints = {
        name(size: 1..20, blank:false)
        picture(maxSize: MAX_SIZE)
    }
}
