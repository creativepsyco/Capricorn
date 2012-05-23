package cap.ser

class Tag {
    
    static belongsTo = Question
    
    static hasMany = [ questions : Question ]
    
    String name
    int count = 0

    static constraints = {
         name(size: 1..20, blank:false)
         count(min: 0)
    }
}
