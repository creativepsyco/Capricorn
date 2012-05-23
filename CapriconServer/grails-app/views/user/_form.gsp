<%@ page import="cap.ser.User" %>



<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'name', 'error')} required">
	<label for="name">
		<g:message code="user.name.label" default="Name" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="name" maxlength="20" required="" value="${userInstance?.name}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'picture', 'error')} required">
	<label for="picture">
		<g:message code="user.picture.label" default="Picture" />
		<span class="required-indicator">*</span>
	</label>
	<input type="file" id="picture" name="picture" />
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'ansComments', 'error')} ">
	<label for="ansComments">
		<g:message code="user.ansComments.label" default="Ans Comments" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${userInstance?.ansComments?}" var="a">
    <li><g:link controller="ansComment" action="show" id="${a.id}">${a?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="ansComment" action="create" params="['user.id': userInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'ansComment.label', default: 'AnsComment')])}</g:link>
</li>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'answers', 'error')} ">
	<label for="answers">
		<g:message code="user.answers.label" default="Answers" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${userInstance?.answers?}" var="a">
    <li><g:link controller="answer" action="show" id="${a.id}">${a?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="answer" action="create" params="['user.id': userInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'answer.label', default: 'Answer')])}</g:link>
</li>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'badges', 'error')} ">
	<label for="badges">
		<g:message code="user.badges.label" default="Badges" />
		
	</label>
	<g:select name="badges" from="${cap.ser.Badge.list()}" multiple="multiple" optionKey="id" size="5" value="${userInstance?.badges*.id}" class="many-to-many"/>
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'date', 'error')} required">
	<label for="date">
		<g:message code="user.date.label" default="Date" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="date" precision="day"  value="${userInstance?.date}"  />
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'qnComments', 'error')} ">
	<label for="qnComments">
		<g:message code="user.qnComments.label" default="Qn Comments" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${userInstance?.qnComments?}" var="q">
    <li><g:link controller="qnComment" action="show" id="${q.id}">${q?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="qnComment" action="create" params="['user.id': userInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'qnComment.label', default: 'QnComment')])}</g:link>
</li>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'questions', 'error')} ">
	<label for="questions">
		<g:message code="user.questions.label" default="Questions" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${userInstance?.questions?}" var="q">
    <li><g:link controller="question" action="show" id="${q.id}">${q?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="question" action="create" params="['user.id': userInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'question.label', default: 'Question')])}</g:link>
</li>
</ul>

</div>

