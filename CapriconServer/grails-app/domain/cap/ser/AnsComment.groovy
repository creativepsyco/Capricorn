package cap.ser

class AnsComment {
    
    static belongsTo = Answer

    User user
    String content
    Date date = new Date()
    
    static constraints = {
        content(blank:false)
    }
}
