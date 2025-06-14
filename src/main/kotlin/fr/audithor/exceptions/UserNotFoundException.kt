package fr.audithor.exceptions

import java.lang.Exception

class UserNotFoundException(val msg: String) : Exception(msg) {
}
