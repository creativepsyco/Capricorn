package cap.ser

class QnComment {
    
    static belongsTo = Question

    User user
    String content
    Date date = new Date()
    
    static constraints = {
        content(blank:false)
    }
}
