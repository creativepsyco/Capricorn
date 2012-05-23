package cap.ser

class Badge {
    
    static belongsTo = User
    
    static final Integer MAX_SIZE = 10 * 1024 * 1024 //10 mb
    
    static hasMany = [ users : User ]
    
    String name
    byte[] picture
    String description
    
    

    static constraints = {
        name(size: 1..20, blank:false)
        picture(maxSize: MAX_SIZE)
        description(blank:false)
    }
}
