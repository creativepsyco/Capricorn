package cap.ser

import org.springframework.dao.DataIntegrityViolationException

class BadgeController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [badgeInstanceList: Badge.list(params), badgeInstanceTotal: Badge.count()]
    }

    def create() {
        [badgeInstance: new Badge(params)]
    }

    def save() {
        def badgeInstance = new Badge(params)
        if (!badgeInstance.save(flush: true)) {
            render(view: "create", model: [badgeInstance: badgeInstance])
            return
        }

		flash.message = message(code: 'default.created.message', args: [message(code: 'badge.label', default: 'Badge'), badgeInstance.id])
        redirect(action: "show", id: badgeInstance.id)
    }

    def show() {
        def badgeInstance = Badge.get(params.id)
        if (!badgeInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'badge.label', default: 'Badge'), params.id])
            redirect(action: "list")
            return
        }

        [badgeInstance: badgeInstance]
    }

    def edit() {
        def badgeInstance = Badge.get(params.id)
        if (!badgeInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'badge.label', default: 'Badge'), params.id])
            redirect(action: "list")
            return
        }

        [badgeInstance: badgeInstance]
    }

    def update() {
        def badgeInstance = Badge.get(params.id)
        if (!badgeInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'badge.label', default: 'Badge'), params.id])
            redirect(action: "list")
            return
        }

        if (params.version) {
            def version = params.version.toLong()
            if (badgeInstance.version > version) {
                badgeInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'badge.label', default: 'Badge')] as Object[],
                          "Another user has updated this Badge while you were editing")
                render(view: "edit", model: [badgeInstance: badgeInstance])
                return
            }
        }

        badgeInstance.properties = params

        if (!badgeInstance.save(flush: true)) {
            render(view: "edit", model: [badgeInstance: badgeInstance])
            return
        }

		flash.message = message(code: 'default.updated.message', args: [message(code: 'badge.label', default: 'Badge'), badgeInstance.id])
        redirect(action: "show", id: badgeInstance.id)
    }

    def delete() {
        def badgeInstance = Badge.get(params.id)
        if (!badgeInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'badge.label', default: 'Badge'), params.id])
            redirect(action: "list")
            return
        }

        try {
            badgeInstance.delete(flush: true)
			flash.message = message(code: 'default.deleted.message', args: [message(code: 'badge.label', default: 'Badge'), params.id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
			flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'badge.label', default: 'Badge'), params.id])
            redirect(action: "show", id: params.id)
        }
    }
}
