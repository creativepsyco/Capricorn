<%@ page import="cap.ser.Badge" %>



<div class="fieldcontain ${hasErrors(bean: badgeInstance, field: 'name', 'error')} required">
	<label for="name">
		<g:message code="badge.name.label" default="Name" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="name" maxlength="20" required="" value="${badgeInstance?.name}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: badgeInstance, field: 'picture', 'error')} required">
	<label for="picture">
		<g:message code="badge.picture.label" default="Picture" />
		<span class="required-indicator">*</span>
	</label>
	<input type="file" id="picture" name="picture" />
</div>

<div class="fieldcontain ${hasErrors(bean: badgeInstance, field: 'description', 'error')} required">
	<label for="description">
		<g:message code="badge.description.label" default="Description" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="description" required="" value="${badgeInstance?.description}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: badgeInstance, field: 'users', 'error')} ">
	<label for="users">
		<g:message code="badge.users.label" default="Users" />
		
	</label>
	
</div>

