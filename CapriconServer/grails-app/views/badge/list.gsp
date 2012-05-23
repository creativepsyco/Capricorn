
<%@ page import="cap.ser.Badge" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'badge.label', default: 'Badge')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-badge" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-badge" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="name" title="${message(code: 'badge.name.label', default: 'Name')}" />
					
						<g:sortableColumn property="picture" title="${message(code: 'badge.picture.label', default: 'Picture')}" />
					
						<g:sortableColumn property="description" title="${message(code: 'badge.description.label', default: 'Description')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${badgeInstanceList}" status="i" var="badgeInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${badgeInstance.id}">${fieldValue(bean: badgeInstance, field: "name")}</g:link></td>
					
						<td>${fieldValue(bean: badgeInstance, field: "picture")}</td>
					
						<td>${fieldValue(bean: badgeInstance, field: "description")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${badgeInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
