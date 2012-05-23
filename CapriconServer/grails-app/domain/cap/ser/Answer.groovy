package cap.ser

class Answer {
    
    static belongsTo = Question
    
    static hasMany = [ comments: AnsComment ]
    
    User user
    String content
    int rating
    Date data = new Date()
    
    static constraints = {
        //content(size: 1..1000, blank:false) //change this size?
        content(blank:false)
        rating(min: 0)
    }
}
