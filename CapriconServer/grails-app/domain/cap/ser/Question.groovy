package cap.ser

class Question {
    
    static hasMany = [ tags: Tag , answers : Answer , comments : QnComment ]
    
    User user
    String title
    String content
    int rating = 0
    Date date = new Date()

    static constraints = {
        title(size: 1..20, blank:false)
        content(blank:false)
        rating(min: 0)
    }
}
